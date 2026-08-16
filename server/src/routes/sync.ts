import { Router } from "express";

/**
 * Dev-only mirror of client/functions/api/sync/[code].ts (the real,
 * deployed sync backend, which is D1-backed). This exists purely so
 * `npm run dev` gives a working Cloud Sync experience without needing
 * `wrangler pages dev` - state lives in memory and is lost on server
 * restart, which is fine for local development but is NOT what runs in
 * production (see the Cloudflare Pages Function for that).
 */
const router = Router();

const MAX_SYNC_BLOB_BYTES = 500_000;
const store = new Map<string, { data: unknown; updatedAt: number }>();

function normalizeCode(raw: string): string | null {
  const code = raw.trim().toUpperCase();
  if (code.length === 0 || code.length > 40) return null;
  if (!/^[A-Z0-9-]+$/.test(code)) return null;
  return code;
}

router.get("/:code", (req, res) => {
  const code = normalizeCode(req.params.code);
  if (!code) {
    res.status(400).json({ error: "Invalid sync code" });
    return;
  }
  const entry = store.get(code);
  if (!entry) {
    res.status(404).json({ error: "No saved data for this code" });
    return;
  }
  res.json(entry);
});

router.post("/:code", (req, res) => {
  const code = normalizeCode(req.params.code);
  if (!code) {
    res.status(400).json({ error: "Invalid sync code" });
    return;
  }
  const bodyText = JSON.stringify(req.body ?? {});
  if (bodyText.length > MAX_SYNC_BLOB_BYTES) {
    res.status(413).json({ error: "Sync payload too large" });
    return;
  }
  const updatedAt = Date.now();
  store.set(code, { data: req.body, updatedAt });
  res.json({ ok: true, updatedAt });
});

export default router;
