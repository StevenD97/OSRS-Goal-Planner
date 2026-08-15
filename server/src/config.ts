export const PORT = Number(process.env.PORT ?? 8787);

// Official Jagex Hiscores (OSRS). No auth, no CORS headers of its own -
// hence proxying it through this server.
export const HISCORES_BASE = "https://secure.runescape.com";

// WikiSync is a community service run by Weird Gloop (the OSRS Wiki team),
// not by Jagex. It only has data for accounts that have opted in by running
// the WikiSync RuneLite/HDOS plugin at least once. See:
// https://oldschool.runescape.wiki/w/RuneScape:WikiSync
export const WIKISYNC_BASE = "https://sync.runescape.wiki";

// WikiSync is a small, free, volunteer-run service. Sending a descriptive
// User-Agent (per their etiquette expectations) and caching responses are
// the minimum we should do to be a good citizen of it.
export const OUTBOUND_USER_AGENT =
  "osrs-goal-planner/0.1 (+https://github.com/) contact: set OSRS_GOAL_PLANNER_CONTACT env var";

export const CACHE_TTL_MS = {
  hiscores: 60_000, // 1 minute - hiscores update slowly
  wikisync: 60_000,
};
