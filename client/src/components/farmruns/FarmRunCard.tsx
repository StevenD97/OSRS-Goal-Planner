import { Link } from "react-router-dom";
import type { FarmRunPreset } from "../../types/farming";
import { Panel } from "../common/Panel";
import { ProgressBar } from "../common/ProgressBar";
import { useFarmRunStore } from "../../state/useFarmRunStore";

export function FarmRunCard({ run }: { run: FarmRunPreset }) {
  const checked = useFarmRunStore((s) => s.getChecked(run.id));
  const total = run.steps.length;
  const done = Object.values(checked).filter(Boolean).length;

  return (
    <Link to={`/farm-runs/${run.id}`}>
      <Panel className="h-full transition-colors hover:border-amber-700/60">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-100">{run.name}</h3>
          <span className="flex-none text-xs text-slate-500">{run.estimatedTime}</span>
        </div>
        <p className="mt-1 text-sm text-slate-400">{run.description}</p>
        <div className="mt-3 flex items-center gap-2">
          <ProgressBar value={total ? (done / total) * 100 : 0} />
          <span className="flex-none text-xs text-slate-500">
            {done}/{total}
          </span>
        </div>
      </Panel>
    </Link>
  );
}
