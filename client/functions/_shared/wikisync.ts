import { WIKISYNC_BASE, OUTBOUND_USER_AGENT } from "./config";

/**
 * WikiSync's response shape is not formally documented anywhere public; see
 * client/src/lib/wikisyncMapper.ts for the single seam that adapts it -
 * this just passes the raw player payload through.
 */
export type WikiSyncRawResponse = Record<string, unknown>;

export class WikiSyncNotSyncedError extends Error {}

export async function fetchWikiSyncPlayer(username: string): Promise<WikiSyncRawResponse> {
  const url = `${WIKISYNC_BASE}/runelite/player/${encodeURIComponent(username)}`;
  const res = await fetch(url, { headers: { "User-Agent": OUTBOUND_USER_AGENT } });

  if (res.status === 400 || res.status === 404) {
    throw new WikiSyncNotSyncedError(
      `No WikiSync data for "${username}" - the player must run the WikiSync plugin at least once while logged in.`,
    );
  }
  if (!res.ok) {
    throw new Error(`WikiSync request failed with status ${res.status}`);
  }

  return (await res.json()) as WikiSyncRawResponse;
}
