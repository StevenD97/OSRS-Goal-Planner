export const HISCORES_BASE = "https://secure.runescape.com";
export const WIKISYNC_BASE = "https://sync.runescape.wiki";

// WikiSync is a small, free, volunteer-run service - please fill in real
// contact info before deploying, per their etiquette expectations.
export const OUTBOUND_USER_AGENT =
  "osrs-goal-planner/0.1 (+https://github.com/) contact: set this before deploying";

// Edge-cached via Cache-Control (Cloudflare's CDN honours this automatically
// for Pages Functions responses) rather than an in-memory TtlCache, since
// Workers isolates don't share memory the way a single Node process does.
export const CACHE_CONTROL = "public, max-age=60";

/** Hard cap on a synced state blob, to bound D1 storage/abuse from the unauthenticated sync endpoint. */
export const MAX_SYNC_BLOB_BYTES = 500_000;
