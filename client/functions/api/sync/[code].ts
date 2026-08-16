import { MAX_SYNC_BLOB_BYTES } from "../../_shared/config";

interface Env {
  DB: D1Database;
}

interface SyncRow {
  data: string;
  updated_at: number;
}

const MAX_CODE_LENGTH = 40;

/**
 * Restricts to the charset the client generates (A-Z0-9 plus hyphens) - not
 * real auth, just enough validation to keep the D1 key space predictable
 * and reject obviously-malicious input. See README's "Cloud sync security
 * model" for the actual security story (code secrecy, not passwords).
 */
function normalizeCode(raw: string | undefined): string | null {
  if (!raw) return null;
  const code = raw.trim().toUpperCase();
  if (code.length === 0 || code.length > MAX_CODE_LENGTH) return null;
  if (!/^[A-Z0-9-]+$/.test(code)) return null;
  return code;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const code = normalizeCode(context.params.code as string | undefined);
  if (!code) return Response.json({ error: "Invalid sync code" }, { status: 400 });

  const row = await context.env.DB.prepare(
    "SELECT data, updated_at FROM sync_blobs WHERE code = ?",
  )
    .bind(code)
    .first<SyncRow>();

  if (!row) return Response.json({ error: "No saved data for this code" }, { status: 404 });

  return Response.json({ data: JSON.parse(row.data), updatedAt: row.updated_at });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const code = normalizeCode(context.params.code as string | undefined);
  if (!code) return Response.json({ error: "Invalid sync code" }, { status: 400 });

  const bodyText = await context.request.text();
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
  await context.env.DB.prepare(
    `INSERT INTO sync_blobs (code, data, updated_at) VALUES (?1, ?2, ?3)
     ON CONFLICT(code) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at`,
  )
    .bind(code, JSON.stringify(parsed), updatedAt)
    .run();

  return Response.json({ ok: true, updatedAt });
};
