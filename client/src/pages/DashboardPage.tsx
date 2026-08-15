import { Link } from "react-router-dom";
import { useMemo } from "react";
import { useAccountStore } from "../state/useAccountStore";
import { useGoalsStore } from "../state/useGoalsStore";
import { useDailiesStore } from "../state/useDailiesStore";
import { getGoalStatus } from "../lib/goalProgress";
import { DAILY_TASKS } from "../data/dailies";
import { FARM_RUNS } from "../data/farmRuns";
import { Panel } from "../components/common/Panel";
import { ProgressBar } from "../components/common/ProgressBar";

export function DashboardPage() {
  const rsn = useAccountStore((s) => s.rsn);
  const hiscores = useAccountStore((s) => s.hiscores);
  const wikisync = useAccountStore((s) => s.wikisync);
  const goals = useGoalsStore((s) => s.goals);
  const isDailyChecked = useDailiesStore((s) => s.isChecked);
  const customTasks = useDailiesStore((s) => s.customTasks);

  const completedGoals = useMemo(
    () => goals.filter((g) => getGoalStatus(g, hiscores, wikisync).completed).length,
    [goals, hiscores, wikisync],
  );

  const allDailyTasks = [...DAILY_TASKS, ...customTasks];
  const doneDailies = allDailyTasks.filter((t) => isDailyChecked(t.id)).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">
          Welcome{rsn ? `, ${rsn}` : ""}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Your goal tracker, daily checklist, and farm run guides in one place.
        </p>
      </div>

      {!rsn && (
        <Panel className="border-amber-800/50 bg-amber-500/5">
          <p className="text-sm text-slate-300">
            You haven't linked a RuneScape name yet.{" "}
            <Link to="/settings" className="text-amber-400 hover:underline">
              Link one in Settings
            </Link>{" "}
            to auto-track skills (Hiscores) and quests/diaries/CAs/collection log (WikiSync).
          </p>
        </Panel>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link to="/goals">
          <Panel className="h-full hover:border-amber-700/60">
            <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
              Goals
            </h2>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {completedGoals}/{goals.length}
            </p>
            <ProgressBar
              value={goals.length ? (completedGoals / goals.length) * 100 : 0}
              className="mt-3"
            />
          </Panel>
        </Link>

        <Link to="/dailies">
          <Panel className="h-full hover:border-amber-700/60">
            <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
              Dailies
            </h2>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {doneDailies}/{allDailyTasks.length}
            </p>
            <ProgressBar
              value={allDailyTasks.length ? (doneDailies / allDailyTasks.length) * 100 : 0}
              className="mt-3"
            />
          </Panel>
        </Link>

        <Link to="/farm-runs">
          <Panel className="h-full hover:border-amber-700/60">
            <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
              Farm Runs
            </h2>
            <p className="mt-2 text-2xl font-semibold text-slate-100">{FARM_RUNS.length} presets</p>
            <p className="mt-3 text-xs text-slate-500">
              Herb, tree, fruit tree, calquat, celastrus, hardwood, allotment &amp; flower
            </p>
          </Panel>
        </Link>
      </div>
    </div>
  );
}
