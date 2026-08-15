import type { WikiSyncCategory } from "./wikisync";

export type GoalCategory =
  | "skill"
  | "boss"
  | "quest"
  | "diary"
  | "combatAchievement"
  | "collectionLog"
  | "custom";

export type GoalSource =
  | { type: "manual" }
  | { type: "skill"; skill: string; targetLevel: number }
  | { type: "activity"; activity: string; targetScore: number }
  | { type: "wikisync"; category: WikiSyncCategory; itemId: string; itemName: string };

export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  source: GoalSource;
  /** Used directly when source.type === "manual"; also acts as a manual override otherwise. */
  manualCompleted: boolean;
  createdAt: number;
  notes?: string;
}

export const GOAL_CATEGORY_LABELS: Record<GoalCategory, string> = {
  skill: "Skill",
  boss: "Boss / Activity",
  quest: "Quest",
  diary: "Achievement Diary",
  combatAchievement: "Combat Achievement",
  collectionLog: "Collection Log",
  custom: "Custom",
};
