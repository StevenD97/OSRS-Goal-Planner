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
        "flex items-center gap-3 rounded-row border px-3 py-2",
        checked ? "border-accent/30 bg-accent-soft" : "border-line bg-surface-2",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="h-4 w-4 flex-none accent-accent"
      />
      <div className="flex-1">
        <span className={clsx(checked ? "text-accent line-through" : "text-ink")}>
          {task.label}
        </span>
        {task.notes && <p className="text-xs text-muted">{task.notes}</p>}
      </div>
      {task.farmRunId && (
        <Link
          to={`/farm-runs/${task.farmRunId}`}
          className="flex-none text-xs text-accent hover:underline"
        >
          Open checklist &rarr;
        </Link>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          className="flex-none text-xs text-muted hover:text-danger"
          aria-label="Remove task"
        >
          Remove
        </button>
      )}
    </li>
  );
}
