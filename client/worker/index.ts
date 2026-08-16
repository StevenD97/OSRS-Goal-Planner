import { fetchHiscores, HiscoresNotFoundError, type HiscoresMode } from "./lib/hiscores";
import { fetchWikiSyncPlayer, WikiSyncNotSyncedError } from "./lib/wikisync";
import { CACHE_CONTROL, MAX_SYNC_BLOB_BYTES } from "./lib/config";

/**
 * Single Worker entry point serving the built SPA (via the ASSETS binding)
 * plus the API routes previously split across Pages Functions files. Moved
 * off Pages Functions because the API token Cloudflare's dashboard Git
 * integration auto-injects for build/deploy has Workers permissions but not
 * Pages ones - `wrangler pages deploy` fails there with an opaque
 * "Authentication error [code: 10000]" even for an account Super Admin.
 * `wrangler deploy` against a Worker+[assets] project (this one) works with
 * that same token, so this is the path of least resistance, not just a
 * style preference - see README's "Deploying for free on Cloudflare".
 *
 * HashRouter means the server never sees app routes (everything after `#`
 * stays client-side), so there's no SPA-fallback/rewrite logic needed here -
 * ASSETS.fetch just serves index.html at `/` and static files everywhere
 * else, same as any other build output.
 */

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

interface SyncRow {
  data: string;
  updated_at: number;
}

const VALID_HISCORES_MODES: HiscoresMode[] = ["normal", "ironman", "hardcore", "ultimate"];
const MAX_SYNC_CODE_LENGTH = 40;

/** Restricts to the charset the client generates (A-Z0-9 plus hyphens) - not
 * real auth, just enough validation to keep the D1 key space predictable
 * and reject obviously-malicious input. See README's "Cloud sync security
 * model" for the actual security story (code secrecy, not passwords). */
function normalizeSyncCode(raw: string): string | null {
  const code = raw.trim().toUpperCase();
  if (code.length === 0 || code.length > MAX_SYNC_CODE_LENGTH) return null;
  if (!/^[A-Z0-9-]+$/.test(code)) return null;
  return code;
}

async function handleHiscores(username: string, url: URL): Promise<Response> {
  const modeParam = url.searchParams.get("mode") ?? "normal";
  const mode = VALID_HISCORES_MODES.includes(modeParam as HiscoresMode)
    ? (modeParam as HiscoresMode)
    : "normal";

  try {
    const result = await fetchHiscores(username, mode);
    return Response.json(result, { headers: { "Cache-Control": CACHE_CONTROL } });
  } catch (err) {
    if (err instanceof HiscoresNotFoundError) {
      return Response.json({ error: err.message }, { status: 404 });
    }
    console.error(err);
    return Response.json({ error: "Failed to fetch hiscores" }, { status: 502 });
  }
}

async function handleWikiSync(username: string): Promise<Response> {
  try {
    const result = await fetchWikiSyncPlayer(username);
    return Response.json(result, { headers: { "Cache-Control": CACHE_CONTROL } });
  } catch (err) {
    if (err instanceof WikiSyncNotSyncedError) {
      return Response.json({ error: err.message }, { status: 404 });
    }
    console.error(err);
    return Response.json({ error: "Failed to fetch WikiSync data" }, { status: 502 });
  }
}

async function handleSyncGet(code: string, env: Env): Promise<Response> {
  const row = await env.DB.prepare("SELECT data, updated_at FROM sync_blobs WHERE code = ?")
    .bind(code)
    .first<SyncRow>();

  if (!row) return Response.json({ error: "No saved data for this code" }, { status: 404 });
  return Response.json({ data: JSON.parse(row.data), updatedAt: row.updated_at });
}

async function handleSyncPost(code: string, request: Request, env: Env): Promise<Response> {
  const bodyText = await request.text();
  if (bodyText.length > MAX_SYNC_BLOB_BYTES) {
    return Response.json({ error: "Sync payload too large" }, { status: 413 });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(bodyText);
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const updatedAt = Date.now();
  await env.DB.prepare(
    `INSERT INTO sync_blobs (code, data, updated_at) VALUES (?1, ?2, ?3)
     ON CONFLICT(code) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
  )
    .bind(code, JSON.stringify(parsed), updatedAt)
    .run();

  return Response.json({ ok: true, updatedAt });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/api/health") {
      return Response.json({ ok: true });
    }

    const hiscoresMatch = path.match(/^\/api\/hiscores\/([^/]+)$/);
    if (hiscoresMatch) {
      return handleHiscores(decodeURIComponent(hiscoresMatch[1]), url);
    }

    const wikisyncMatch = path.match(/^\/api\/wikisync\/([^/]+)$/);
    if (wikisyncMatch) {
      return handleWikiSync(decodeURIComponent(wikisyncMatch[1]));
    }

    const syncMatch = path.match(/^\/api\/sync\/([^/]+)$/);
    if (syncMatch) {
      const code = normalizeSyncCode(decodeURIComponent(syncMatch[1]));
      if (!code) return Response.json({ error: "Invalid sync code" }, { status: 400 });
      if (request.method === "GET") return handleSyncGet(code, env);
      if (request.method === "POST") return handleSyncPost(code, request, env);
      return new Response("Method not allowed", { status: 405 });
    }

    if (path.startsWith("/api/")) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    return env.ASSETS.fetch(request);
  },
};
