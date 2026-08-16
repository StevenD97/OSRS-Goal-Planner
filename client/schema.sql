-- D1 schema for cloud sync. Apply with:
--   npx wrangler d1 execute osrs-goal-planner-sync --remote --file=./schema.sql
-- (drop --remote to apply to the local dev D1 instance instead)
CREATE TABLE IF NOT EXISTS sync_blobs (
  code TEXT PRIMARY KEY,
  data TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
