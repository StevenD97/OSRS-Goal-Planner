import type { HiscoresMode, HiscoresResult } from "../types/hiscores";
import type { WikiSyncRawResponse } from "../types/wikisync";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(body.error ?? `Request failed with status ${res.status}`, res.status);
  }
  return res.json() as Promise<T>;
}

export function fetchHiscores(
  username: string,
  mode: HiscoresMode = "normal",
): Promise<HiscoresResult> {
  return getJson(`/api/hiscores/${encodeURIComponent(username)}?mode=${mode}`);
}

export function fetchWikiSync(username: string): Promise<WikiSyncRawResponse> {
  return getJson(`/api/wikisync/${encodeURIComponent(username)}`);
}
