import { useMemo, useState } from "react";
import { useGoalsStore } from "../state/useGoalsStore";
import { useAccountStore } from "../state/useAccountStore";
import { getGoalStatus } from "../lib/goalProgress";
import type { GoalCategory } from "../types/goals";
import { GOAL_CATEGORY_LABELS } from "../types/goals";
import { GoalCard } from "../components/goals/GoalCard";
import { AddGoalForm } from "../components/goals/AddGoalForm";
import { ProgressBar } from "../components/common/ProgressBar";

const ALL = "all" as const;

export function GoalsPage() {
  const goals = useGoalsStore((s) => s.goals);
  const members = useAccountStore((s) => s.members);
  const [filter, setFilter] = useState<GoalCategory | typeof ALL>(ALL);

  const visibleGoals = useMemo(
    () => (filter === ALL ? goals : goals.filter((g) => g.category === filter)),
    [goals, filter],
  );

  const completedCount = useMemo(
    () => goals.filter((g) => getGoalStatus(g, members).completed).length,
    [goals, members],
  );

  const categoriesUsed = useMemo(
    () => Array.from(new Set(goals.map((g) => g.category))),
    [goals],
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Goals</h1>
          <p className="mt-1 text-sm text-muted">
            Skill goals and boss KC auto-track from the Hiscores. Quests, diaries, combat
            achievements and the collection log auto-track from WikiSync once you've synced.
          </p>
        </div>
        <div className="flex min-w-[200px] items-center gap-2">
          <ProgressBar value={goals.length ? (completedCount / goals.length) * 100 : 0} />
          <span className="flex-none text-sm text-muted">
            {completedCount}/{goals.length}
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(ALL)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              filter === ALL ? "bg-accent text-on-accent" : "bg-surface-2 text-ink-2"
            }`}
          >
            All
          </button>
          {categoriesUsed.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                filter === cat ? "bg-accent text-on-accent" : "bg-surface-2 text-ink-2"
              }`}
            >
              {GOAL_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
        <AddGoalForm />
      </div>

      {visibleGoals.length === 0 ? (
        <p className="text-sm text-muted">
          No goals yet - add a skill target, link a quest/diary from WikiSync, or set a custom
          goal above.
        </p>
      ) : (
        <ul className="space-y-2">
          {visibleGoals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </ul>
      )}
    </div>
  );
}
