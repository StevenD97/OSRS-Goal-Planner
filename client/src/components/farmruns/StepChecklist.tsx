import { clsx } from "clsx";
import type { FarmRunStep } from "../../types/farming";

export function StepChecklist({
  steps,
  checked,
  onToggle,
}: {
  steps: FarmRunStep[];
  checked: Record<string, boolean>;
  onToggle: (stepId: string) => void;
}) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => {
        const isChecked = !!checked[step.id];
        return (
          <li
            key={step.id}
            className={clsx(
              "rounded-lg border p-3 transition-colors",
              isChecked
                ? "border-emerald-800 bg-emerald-500/5"
                : "border-slate-800 bg-slate-900/40",
            )}
          >
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(step.id)}
                className="mt-1 h-4 w-4 flex-none accent-amber-500"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">{i + 1}.</span>
                  <span
                    className={clsx(
                      "font-medium",
                      isChecked ? "text-emerald-400 line-through" : "text-slate-100",
                    )}
                  >
                    {step.location}
                  </span>
                </div>
                <ul className="mt-1.5 ml-5 list-disc space-y-0.5 text-sm text-slate-400">
                  {step.actions.map((action, j) => (
                    <li key={j}>{action}</li>
                  ))}
                </ul>
              </div>
            </label>
          </li>
        );
      })}
    </ol>
  );
}
