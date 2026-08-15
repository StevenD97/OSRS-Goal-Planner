/** Raw JSON as returned by our /api/wikisync proxy (passthrough of WikiSync's response). */
export type WikiSyncRawResponse = Record<string, unknown>;

export type WikiSyncCategory =
  | "quests"
  | "achievementDiaries"
  | "combatAchievements"
  | "collectionLog"
  | "leaguesTasks"
  | "music";

/** A single trackable item within a WikiSync category, after normalization. */
export interface WikiSyncItem {
  id: string;
  name: string;
  completed: boolean;
  /** Free-form extra info (e.g. diary tier, CA tier) when available. */
  meta?: string;
}

/** Normalized, UI-friendly shape produced by lib/wikisyncMapper.ts. */
export interface WikiSyncNormalized {
  username: string;
  syncedAt: number;
  categories: Partial<Record<WikiSyncCategory, WikiSyncItem[]>>;
  /** True if we could not confidently parse the raw response into any known category. */
  unparsed: boolean;
}
