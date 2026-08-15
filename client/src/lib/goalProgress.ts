import type { Goal } from "../types/goals";
import type { HiscoresResult } from "../types/hiscores";
import type { WikiSyncNormalized } from "../types/wikisync";

export interface GoalStatus {
  completed: boolean;
  /** 0-100 */
  progress: number;
  /** Short human-readable progress caption, e.g. "62/75" */
  caption?: string;
  /** Whether we have live sync data to evaluate this goal against. */
  synced: boolean;
}

export function getGoalStatus(
  goal: Goal,
  hiscores: HiscoresResult | null,
  wikisync: WikiSyncNormalized | null,
): GoalStatus {
  const { source, manualCompleted } = goal;

  if (source.type === "manual") {
    return { completed: manualCompleted, progress: manualCompleted ? 100 : 0, synced: true };
  }

  if (source.type === "skill") {
    const entry = hiscores?.skills.find((s) => s.name === source.skill);
    if (!entry || entry.level < 0) {
      return { completed: manualCompleted, progress: manualCompleted ? 100 : 0, synced: false };
    }
    const completed = manualCompleted || entry.level >= source.targetLevel;
    const progress = Math.min(100, (entry.level / source.targetLevel) * 100);
    return { completed, progress, caption: `${entry.level}/${source.targetLevel}`, synced: true };
  }

  if (source.type === "activity") {
    const entry = hiscores?.activities.find((a) => a.name === source.activity);
    if (!entry || entry.score < 0) {
      return { completed: manualCompleted, progress: manualCompleted ? 100 : 0, synced: false };
    }
    const completed = manualCompleted || entry.score >= source.targetScore;
    const progress = Math.min(100, (entry.score / source.targetScore) * 100);
    return {
      completed,
      progress,
      caption: `${entry.score}/${source.targetScore}`,
      synced: true,
    };
  }

  // source.type === "wikisync"
  const items = wikisync?.categories[source.category];
  const item = items?.find((i) => i.id === source.itemId);
  if (!item) {
    return { completed: manualCompleted, progress: manualCompleted ? 100 : 0, synced: false };
  }
  const completed = manualCompleted || item.completed;
  return { completed, progress: completed ? 100 : 0, synced: true };
}
