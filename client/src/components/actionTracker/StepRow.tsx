import { clsx } from "clsx";
import type { PlanStep } from "../../types/actionTracker";
import { Badge } from "../common/Badge";
import { useAccountStore } from "../../state/useAccountStore";
import { useGearProgressionStore } from "../../state/useGearProgressionStore";
import { useActionTrackerStore } from "../../state/useActionTrackerStore";
import { isStepComplete } from "../../lib/actionPlan";

const KIND_LABEL: Record<PlanStep["kind"], string> = {
  quest: "Quest",
  skill: "Skill",
  other: "To-do",
  gearItem: "Goal",
};

function stepLabel(step: PlanStep): string {
  if (step.kind === "quest") return `Complete: ${step.questName}`;
  if (step.kind === "skill") return `Reach level ${step.level} ${step.skill}`;
  if (step.kind === "gearItem") return `Obtain: ${step.itemName}`;
  return step.label;
}

export function StepRow({ step, index }: { step: PlanStep; index: number }) {
  const members = useAccountStore((s) => s.members);
  const gearObtained = useGearProgressionStore((s) => s.obtained);
  const toggleGearObtained = useGearProgressionStore((s) => s.toggle);
  const checked = useActionTrackerStore((s) => s.checked);
  const toggleChecked = useActionTrackerStore((s) => s.toggleChecked);

  const complete = isStepComplete(step, members, gearObtained, checked);
  const autoTracked = step.kind === "quest" || step.kind === "skill";

  function handleToggle() {
    if (step.kind === "gearItem") toggleGearObtained(step.gearItemId);
    else toggleChecked(step.id);
  }

  return (
    <li
      className={clsx(
        "flex items-start gap-3 rounded-md border px-3 py-2",
        step.kind === "gearItem" && "border-amber-700/60 bg-amber-500/5",
        complete && step.kind !== "gearItem" && "border-emerald-800 bg-emerald-500/5",
        !complete && step.kind !== "gearItem" && "border-slate-800 bg-slate-900/40",
        complete && step.kind === "gearItem" && "border-emerald-800 bg-emerald-500/10",
      )}
    >
      <span className="mt-1 w-5 flex-none text-right text-xs font-mono text-slate-500">
        {index + 1}.
      </span>
      <input
        type="checkbox"
        checked={complete}
        onChange={handleToggle}
        className="mt-1 h-4 w-4 flex-none accent-amber-500"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={clsx(
              step.kind === "gearItem" ? "font-semibold" : "font-medium",
              complete ? "text-emerald-400 line-through" : "text-slate-100",
            )}
          >
            {stepLabel(step)}
          </span>
          <Badge tone={step.kind === "gearItem" ? "amber" : "neutral"}>
            {KIND_LABEL[step.kind]}
          </Badge>
          {autoTracked && <Badge tone="blue">auto-tracked</Badge>}
        </div>
      </div>
    </li>
  );
}
