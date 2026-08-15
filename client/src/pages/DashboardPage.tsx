import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useAccountStore } from "../state/useAccountStore";
import { useGoalsStore } from "../state/useGoalsStore";
import { useDailiesStore } from "../state/useDailiesStore";
import { getGoalStatus } from "../lib/goalProgress";
import { DAILY_TASKS } from "../data/dailies";
import { FARM_RUNS } from "../data/farmRuns";
import { GEAR_PROGRESSION } from "../data/gearProgression";
import { Panel } from "../components/common/Panel";
import { ProgressBar } from "../components/common/ProgressBar";
import { useGearProgressionStore } from "../state/useGearProgressionStore";
import { useActionTrackerStore } from "../state/useActionTrackerStore";
import { isStepComplete } from "../lib/actionPlan";

export function DashboardPage() {
  const members = useAccountStore((s) => s.members);
  const goals = useGoalsStore((s) => s.goals);
  const isDailyChecked = useDailiesStore((s) => s.isChecked);
  const customTasks = useDailiesStore((s) => s.customTasks);
  const obtainedGear = useGearProgressionStore((s) => s.obtained);

  const completedGoals = useMemo(
    () => goals.filter((g) => getGoalStatus(g, members).completed).length,
    [goals, members],
  );

  const allDailyTasks = [...DAILY_TASKS, ...customTasks];
  const doneDailies = allDailyTasks.filter((t) => isDailyChecked(t.id)).length;

  const allGearItems = useMemo(() => GEAR_PROGRESSION.flatMap((t) => t.items), []);
  const doneGear = allGearItems.filter((i) => obtainedGear[i.id]).length;

  const plans = useActionTrackerStore((s) => s.plans);
  const checked = useActionTrackerStore((s) => s.checked);
  const allPlanSteps = plans.flatMap((p) => p.steps);
  const donePlanSteps = allPlanSteps.filter((s) =>
    isStepComplete(s, members, obtainedGear, checked),
  ).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink">
          Welcome
          {members.length === 1
            ? `, ${members[0].rsn}`
            : members.length > 1
              ? ` - tracking a group of ${members.length}`
              : ""}
        </h1>
        <p className="mt-1 text-sm text-muted">
          Your goal tracker, daily checklist, gear progression, and farm run guides in one place.
        </p>
      </div>

      {members.length === 0 && (
        <Panel className="border-accent/40 bg-accent-soft">
          <p className="text-sm text-ink-2">
            You haven't linked an account yet.{" "}
            <Link to="/settings" className="text-accent hover:underline">
              Link one (or your whole Group Ironman roster) in Settings
            </Link>{" "}
            to auto-track skills (Hiscores) and quests/diaries/CAs/collection log (WikiSync).
          </p>
        </Panel>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Link to="/goals">
          <Panel className="h-full hover:border-accent">
            <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
              Goals
            </h2>
            <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
              {completedGoals}/{goals.length}
            </p>
            <ProgressBar
              value={goals.length ? (completedGoals / goals.length) * 100 : 0}
              className="mt-3"
            />
          </Panel>
        </Link>

        <Link to="/dailies">
          <Panel className="h-full hover:border-accent">
            <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
              Dailies
            </h2>
            <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
              {doneDailies}/{allDailyTasks.length}
            </p>
            <ProgressBar
              value={allDailyTasks.length ? (doneDailies / allDailyTasks.length) * 100 : 0}
              className="mt-3"
            />
          </Panel>
        </Link>

        <Link to="/farm-runs">
          <Panel className="h-full hover:border-accent">
            <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
              Farm Runs
            </h2>
            <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">{FARM_RUNS.length} presets</p>
            <p className="mt-3 text-xs text-muted">
              Herb, tree, fruit tree, calquat, celastrus, hardwood, allotment &amp; flower
            </p>
          </Panel>
        </Link>

        <Link to="/gear">
          <Panel className="h-full hover:border-accent">
            <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
              Gear Progression
            </h2>
            <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
              {doneGear}/{allGearItems.length}
            </p>
            <ProgressBar
              value={allGearItems.length ? (doneGear / allGearItems.length) * 100 : 0}
              className="mt-3"
            />
          </Panel>
        </Link>

        <Link to="/action-tracker">
          <Panel className="h-full hover:border-accent">
            <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
              Action Tracker
            </h2>
            <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-ink">
              {plans.length ? `${donePlanSteps}/${allPlanSteps.length}` : "0 plans"}
            </p>
            <ProgressBar
              value={allPlanSteps.length ? (donePlanSteps / allPlanSteps.length) * 100 : 0}
              className="mt-3"
            />
          </Panel>
        </Link>
      </div>
    </div>
  );
}
