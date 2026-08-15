import type {
  WikiSyncCategory,
  WikiSyncItem,
  WikiSyncNormalized,
  WikiSyncRawResponse,
} from "../types/wikisync";

/**
 * WikiSync's public response shape isn't formally documented. This mapper is
 * written defensively to handle a few plausible shapes (array-of-objects,
 * or an object map of name -> boolean/status) so the UI degrades gracefully
 * instead of crashing. Once you've inspected a real response for a synced
 * account (see README "Verifying WikiSync"), tighten this up to match it
 * exactly and drop the guesswork.
 */

// Known/likely raw keys per category, in priority order.
const CATEGORY_KEYS: Record<WikiSyncCategory, string[]> = {
  quests: ["quests", "quest"],
  achievementDiaries: ["achievement_diaries", "achievementDiaries", "diaries"],
  combatAchievements: ["combat_achievements", "combatAchievements"],
  collectionLog: ["collection_log", "collectionLog"],
  leaguesTasks: ["league_tasks", "leaguesTasks", "leagues"],
  music: ["music_tracks", "music"],
};

function isCompleted(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return value > 0;
  if (typeof value === "string") return ["true", "complete", "completed", "done"].includes(value.toLowerCase());
  if (value && typeof value === "object") {
    const v = value as Record<string, unknown>;
    if ("completed" in v) return isCompleted(v.completed);
    if ("complete" in v) return isCompleted(v.complete);
    if ("done" in v) return isCompleted(v.done);
    if ("status" in v) return isCompleted(v.status);
  }
  return false;
}

function toItems(raw: unknown): WikiSyncItem[] {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return raw.map((entry, i) => {
      if (typeof entry === "string") {
        return { id: entry, name: entry, completed: true };
      }
      const e = entry as Record<string, unknown>;
      const name = String(e.name ?? e.id ?? e.title ?? `Item ${i}`);
      return {
        id: String(e.id ?? name),
        name,
        completed: isCompleted(e),
        meta: e.tier ? String(e.tier) : undefined,
      };
    });
  }

  if (typeof raw === "object") {
    return Object.entries(raw as Record<string, unknown>).map(([name, value]) => ({
      id: name,
      name,
      completed: isCompleted(value),
    }));
  }

  return [];
}

export function mapWikiSyncResponse(
  username: string,
  raw: WikiSyncRawResponse,
): WikiSyncNormalized {
  const categories: WikiSyncNormalized["categories"] = {};
  let foundAny = false;

  for (const [category, keys] of Object.entries(CATEGORY_KEYS) as [
    WikiSyncCategory,
    string[],
  ][]) {
    for (const key of keys) {
      if (key in raw) {
        const items = toItems(raw[key]);
        if (items.length > 0) {
          categories[category] = items;
          foundAny = true;
        }
        break;
      }
    }
  }

  return {
    username,
    syncedAt: Date.now(),
    categories,
    unparsed: !foundAny,
  };
}
