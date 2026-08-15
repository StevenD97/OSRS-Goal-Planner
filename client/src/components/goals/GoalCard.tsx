import { clsx } from "clsx";
import type { Goal } from "../../types/goals";
import { GOAL_CATEGORY_LABELS } from "../../types/goals";
import { useAccountStore } from "../../state/useAccountStore";
import { useGoalsStore } from "../../state/useGoalsStore";
import { getGoalStatus } from "../../lib/goalProgress";
import { Badge } from "../common/Badge";
import { ProgressBar } from "../common/ProgressBar";

export function GoalCard({ goal }: { goal: Goal }) {
  const hiscores = useAccountStore((s) => s.hiscores);
  const wikisync = useAccountStore((s) => s.wikisync);
  const setManualCompleted = useGoalsStore((s) => s.setManualCompleted);
  const removeGoal = useGoalsStore((s) => s.removeGoal);

  const status = getGoalStatus(goal, hiscores, wikisync);

  return (
    <li
      className={clsx(
        "flex items-start gap-3 rounded-lg border p-3",
        status.completed ? "border-emerald-800 bg-emerald-500/5" : "border-slate-800 bg-slate-900/40",
      )}
    >
      <input
        type="checkbox"
        checked={goal.manualCompleted}
        onChange={(e) => setManualCompleted(goal.id, e.target.checked)}
        className="mt-1 h-4 w-4 flex-none accent-amber-500"
        title="Manual override"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={clsx(
              "font-medium",
              status.completed ? "text-emerald-400 line-through" : "text-slate-100",
            )}
          >
            {goal.title}
          </span>
          <Badge tone="neutral">{GOAL_CATEGORY_LABELS[goal.category]}</Badge>
          {!status.synced && goal.source.type !== "manual" && (
            <Badge tone="amber">not synced yet</Badge>
          )}
        </div>
        {goal.notes && <p className="mt-0.5 text-xs text-slate-500">{goal.notes}</p>}
        {status.caption && (
          <div className="mt-2 flex max-w-xs items-center gap-2">
            <ProgressBar value={status.progress} />
            <span className="flex-none text-xs text-slate-500">{status.caption}</span>
          </div>
        )}
      </div>
      <button
        onClick={() => removeGoal(goal.id)}
        className="flex-none text-xs text-slate-500 hover:text-rose-400"
      >
        Remove
      </button>
    </li>
  );
}
