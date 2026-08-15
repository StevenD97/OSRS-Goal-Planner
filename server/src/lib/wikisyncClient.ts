import { WIKISYNC_BASE, OUTBOUND_USER_AGENT, CACHE_TTL_MS } from "../config.js";
import { TtlCache } from "./cache.js";

/**
 * WikiSync's response shape is not formally documented anywhere public; this
 * is inferred from the open-source backend (github.com/weirdgloop/wikisync-api,
 * src/runelite/router.ts + src/runelite/transformers/*) which passes the
 * player's raw data through per-category "transformer" classes: Quest,
 * AchievementDiary, League, Bingo, CombatAchievements, Music, CollectionLog,
 * Sailing. We deliberately type this loosely and let the client-side mapper
 * (client/src/lib/wikisyncMapper.ts) be the single seam to adjust once you've
 * inspected a real response for an account that has WikiSync data.
 */
export type WikiSyncRawResponse = Record<string, unknown>;

export class WikiSyncNotSyncedError extends Error {}

const cache = new TtlCache<WikiSyncRawResponse>(CACHE_TTL_MS.wikisync);

export async function fetchWikiSyncPlayer(
  username: string,
): Promise<WikiSyncRawResponse> {
  const cacheKey = username.toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const url = `${WIKISYNC_BASE}/runelite/player/${encodeURIComponent(username)}`;
  const res = await fetch(url, {
    headers: { "User-Agent": OUTBOUND_USER_AGENT },
  });

  if (res.status === 400 || res.status === 404) {
    throw new WikiSyncNotSyncedError(
      `No WikiSync data for "${username}" - the player must run the WikiSync plugin at least once while logged in.`,
    );
  }
  if (!res.ok) {
    throw new Error(`WikiSync request failed with status ${res.status}`);
  }

  const data = (await res.json()) as WikiSyncRawResponse;
  cache.set(cacheKey, data);
  return data;
}
