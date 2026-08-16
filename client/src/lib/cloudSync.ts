/**
 * Cloud sync moves a snapshot of the app's localStorage keys to/from a
 * small free Cloudflare D1-backed API (functions/api/sync/[code].ts),
 * keyed by a random code instead of a real account - see README's "Cloud
 * sync security model" for what that does and doesn't protect against.
 *
 * Deliberately dumb: it copies raw localStorage string values rather than
 * reaching into each Zustand store's internals, so it can't drift out of
 * sync with whatever shape persist() gives those stores. Applying a pulled
 * snapshot writes straight to localStorage - the caller must reload the
 * page afterward, since Zustand's persist middleware only rehydrates from
 * localStorage at store-creation time (page load), not on a later write.
 */

const SYNCED_KEYS = [
  "osrs-goal-planner:account",
  "osrs-goal-planner:goals",
  "osrs-goal-planner:dailies",
  "osrs-goal-planner:farm-runs",
  "osrs-goal-planner:gear-progression",
  "osrs-goal-planner:action-tracker",
  "osrs-goal-planner:dps-calculator",
] as const;

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O or 1/I/L

/** ~60 bits of entropy - impractical to guess, easy to copy-paste. */
export function generateSyncCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  const chars = Array.from(bytes, (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]);
  return `${chars.slice(0, 4).join("")}-${chars.slice(4, 8).join("")}-${chars.slice(8, 12).join("")}`;
}

export function collectLocalSnapshot(): Record<string, string> {
  const snapshot: Record<string, string> = {};
  for (const key of SYNCED_KEYS) {
    const value = localStorage.getItem(key);
    if (value != null) snapshot[key] = value;
  }
  return snapshot;
}

export function applySnapshot(snapshot: Record<string, unknown>): void {
  for (const key of SYNCED_KEYS) {
    const value = snapshot[key];
    if (typeof value === "string") localStorage.setItem(key, value);
  }
}

async function readJson<T>(res: Response): Promise<T> {
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((body as { error?: string }).error ?? `Request failed with status ${res.status}`);
  }
  return body as T;
}

export async function pushSnapshot(code: string): Promise<{ updatedAt: number }> {
  const res = await fetch(`/api/sync/${encodeURIComponent(code)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(collectLocalSnapshot()),
  });
  return readJson(res);
}

export async function pullSnapshot(
  code: string,
): Promise<{ data: Record<string, unknown>; updatedAt: number } | null> {
  const res = await fetch(`/api/sync/${encodeURIComponent(code)}`);
  if (res.status === 404) return null;
  return readJson(res);
}
