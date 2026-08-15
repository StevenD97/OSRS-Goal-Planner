/**
 * A single prerequisite. Shared between quests and gear items so the
 * resolver (lib/actionPlan.ts) can walk both uniformly: a gear item may
 * require a quest, and that quest may itself require other quests/skills.
 */
export type Requirement =
  | { type: "quest"; questId: string }
  | { type: "skill"; skill: string; level: number }
  | { type: "other"; label: string };
