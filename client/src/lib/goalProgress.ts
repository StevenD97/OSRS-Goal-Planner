import type { Goal } from "../types/goals";
import type { GroupMember } from "../state/useAccountStore";
import { aggregateSkillLevel, aggregateActivityScore, isWikiSyncItemCompletedByGroup } from "./groupAggregate";

export interface GoalStatus {
  completed: boolean;
  /** 0-100 */
  progress: number;
  /** Short human-readable progress caption, e.g. "62/75" */
  caption?: string;
  /** Whether we have live sync data to evaluate this goal against. */
  synced: boolean;
}

/** A goal is complete if ANY linked group member satisfies it - see lib/groupAggregate.ts. */
export function getGoalStatus(goal: Goal, members: GroupMember[]): GoalStatus {
  const { source, manualCompleted } = goal;

  if (source.type === "manual") {
    return { completed: manualCompleted, progress: manualCompleted ? 100 : 0, synced: true };
  }

  if (source.type === "skill") {
    const level = aggregateSkillLevel(members, source.skill);
    if (level < 0) {
      return { completed: manualCompleted, progress: manualCompleted ? 100 : 0, synced: false };
    }
    const completed = manualCompleted || level >= source.targetLevel;
    const progress = Math.min(100, (level / source.targetLevel) * 100);
    return { completed, progress, caption: `${level}/${source.targetLevel}`, synced: true };
  }

  if (source.type === "activity") {
    const score = aggregateActivityScore(members, source.activity);
    if (score < 0) {
      return { completed: manualCompleted, progress: manualCompleted ? 100 : 0, synced: false };
    }
    const completed = manualCompleted || score >= source.targetScore;
    const progress = Math.min(100, (score / source.targetScore) * 100);
    return { completed, progress, caption: `${score}/${source.targetScore}`, synced: true };
  }

  // source.type === "wikisync"
  const hasAnySync = members.some((m) => m.wikisync);
  if (!hasAnySync) {
    return { completed: manualCompleted, progress: manualCompleted ? 100 : 0, synced: false };
  }
  const completed =
    manualCompleted || isWikiSyncItemCompletedByGroup(members, source.category, source.itemId);
  return { completed, progress: completed ? 100 : 0, synced: true };
}
