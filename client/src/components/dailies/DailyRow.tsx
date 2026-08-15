import { Link } from "react-router-dom";
import { clsx } from "clsx";
import type { DailyTask } from "../../types/dailies";

export function DailyRow({
  task,
  checked,
  onToggle,
  onRemove,
}: {
  task: DailyTask;
  checked: boolean;
  onToggle: () => void;
  onRemove?: () => void;
}) {
  return (
    <li
      className={clsx(
        "flex items-center gap-3 rounded-md border px-3 py-2",
        checked ? "border-emerald-800 bg-emerald-500/5" : "border-slate-800 bg-slate-900/40",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="h-4 w-4 flex-none accent-amber-500"
      />
      <div className="flex-1">
        <span className={clsx(checked ? "text-emerald-400 line-through" : "text-slate-100")}>
          {task.label}
        </span>
        {task.notes && <p className="text-xs text-slate-500">{task.notes}</p>}
      </div>
      {task.farmRunId && (
        <Link
          to={`/farm-runs/${task.farmRunId}`}
          className="flex-none text-xs text-amber-400 hover:underline"
        >
          Open checklist &rarr;
        </Link>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex-none text-xs text-slate-500 hover:text-rose-400"
          aria-label="Remove task"
        >
          Remove
        </button>
      )}
    </li>
  );
}
