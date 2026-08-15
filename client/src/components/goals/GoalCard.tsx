import { clsx } from "clsx";
import type { Goal } from "../../types/goals";
import { GOAL_CATEGORY_LABELS } from "../../types/goals";
import { useAccountStore } from "../../state/useAccountStore";
import { useGoalsStore } from "../../state/useGoalsStore";
import { getGoalStatus } from "../../lib/goalProgress";
import { Badge } from "../common/Badge";
import { ProgressBar } from "../common/ProgressBar";

export function GoalCard({ goal }: { goal: Goal }) {
  const members = useAccountStore((s) => s.members);
  const setManualCompleted = useGoalsStore((s) => s.setManualCompleted);
  const removeGoal = useGoalsStore((s) => s.removeGoal);

  const status = getGoalStatus(goal, members);

  return (
    <li
      className={clsx(
        "flex items-start gap-3 rounded-panel border p-3",
        status.completed ? "border-accent/30 bg-accent-soft" : "border-line bg-surface-2",
      )}
    >
      <input
        type="checkbox"
        checked={goal.manualCompleted}
        onChange={(e) => setManualCompleted(goal.id, e.target.checked)}
        className="mt-1 h-4 w-4 flex-none accent-accent"
        title="Manual override"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={clsx(
              "font-medium",
              status.completed ? "text-accent line-through" : "text-ink",
            )}
          >
            {goal.title}
          </span>
          <Badge tone="neutral">{GOAL_CATEGORY_LABELS[goal.category]}</Badge>
          {!status.synced && goal.source.type !== "manual" && (
            <Badge tone="bronze">not synced yet</Badge>
          )}
        </div>
        {goal.notes && <p className="mt-0.5 text-xs text-muted">{goal.notes}</p>}
        {status.caption && (
          <div className="mt-2 flex max-w-xs items-center gap-2">
            <ProgressBar value={status.progress} />
            <span className="flex-none font-mono text-xs tabular-nums text-muted">{status.caption}</span>
          </div>
        )}
      </div>
      <button
        onClick={() => removeGoal(goal.id)}
        className="flex-none text-xs text-muted hover:text-danger"
      >
        Remove
      </button>
    </li>
  );
}
