import { Link, useParams } from "react-router-dom";
import { FARM_RUNS_BY_ID } from "../data/farmRuns";
import { Panel } from "../components/common/Panel";
import { ProgressBar } from "../components/common/ProgressBar";
import { StepChecklist } from "../components/farmruns/StepChecklist";
import { LoadoutList } from "../components/farmruns/LoadoutList";
import { useFarmRunStore } from "../state/useFarmRunStore";

export function FarmRunDetailPage() {
  const { runId } = useParams<{ runId: string }>();
  const run = runId ? FARM_RUNS_BY_ID[runId] : undefined;
  const checked = useFarmRunStore((s) => (runId ? s.getChecked(runId) : {}));
  const toggleStep = useFarmRunStore((s) => s.toggleStep);
  const resetRun = useFarmRunStore((s) => s.resetRun);

  if (!run) {
    return (
      <div>
        <p className="text-slate-400">Unknown farm run.</p>
        <Link to="/farm-runs" className="text-amber-400 hover:underline">
          Back to Farm Runs
        </Link>
      </div>
    );
  }

  const total = run.steps.length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <div>
      <Link to="/farm-runs" className="text-sm text-amber-400 hover:underline">
        &larr; All farm runs
      </Link>

      <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">{run.name}</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-400">{run.description}</p>
        </div>
        <button
          onClick={() => resetRun(run.id)}
          className="flex-none rounded-md border border-slate-700 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800"
        >
          Reset checklist
        </button>
      </div>

      {run.requirements && run.requirements.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {run.requirements.map((req) => (
            <li
              key={req}
              className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
            >
              {req}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center gap-3">
        <ProgressBar value={total ? (done / total) * 100 : 0} className="max-w-xs" />
        <span className="text-sm text-slate-400">
          {done}/{total} stops done
        </span>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Checklist
          </h2>
          <StepChecklist
            steps={run.steps}
            checked={checked}
            onToggle={(stepId) => toggleStep(run.id, stepId)}
          />
        </div>
        <div>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-slate-400 uppercase">
            Preset Loadout
          </h2>
          <Panel>
            <LoadoutList items={run.loadout} />
          </Panel>
          <p className="mt-3 text-xs text-slate-500">
            Source:{" "}
            <a href={run.sourceUrl} target="_blank" rel="noreferrer" className="hover:underline">
              OSRS Wiki - Farming runs
            </a>
            . Payment items and access requirements can change with game updates - double check
            in-game if something seems off.
          </p>
        </div>
      </div>
    </div>
  );
}
