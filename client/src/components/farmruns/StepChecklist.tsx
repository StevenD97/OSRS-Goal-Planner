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
              "rounded-panel border p-3 transition-colors",
              isChecked
                ? "border-accent/30 bg-accent-soft"
                : "border-line bg-surface-2",
            )}
          >
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(step.id)}
                className="mt-1 h-4 w-4 flex-none accent-accent"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-muted">{i + 1}.</span>
                  <span
                    className={clsx(
                      "font-medium",
                      isChecked ? "text-accent line-through" : "text-ink",
                    )}
                  >
                    {step.location}
                  </span>
                </div>
                <ul className="mt-1.5 ml-5 list-disc space-y-0.5 text-sm text-muted">
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
