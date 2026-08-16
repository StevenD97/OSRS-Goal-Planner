import { clsx } from "clsx";
import type { PlanStep } from "../../types/actionTracker";
import { Badge } from "../common/Badge";
import { WikiIcon } from "../common/WikiIcon";
import { ITEM_ICON } from "../../data/itemIcons";
import { SKILL_ICON } from "../../data/skillIcons";
import { QUEST_POINT_ICON } from "../../lib/wikiIcon";
import { useAccountStore } from "../../state/useAccountStore";
import { useGearProgressionStore } from "../../state/useGearProgressionStore";
import { useActionTrackerStore } from "../../state/useActionTrackerStore";
import { isStepComplete } from "../../lib/actionPlan";

function stepIcon(step: PlanStep): string | undefined {
  if (step.kind === "gearItem") return ITEM_ICON[step.gearItemId];
  if (step.kind === "skill") return SKILL_ICON[step.skill];
  if (step.kind === "quest") return QUEST_POINT_ICON;
  return undefined;
}

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
        "flex items-start gap-3 rounded-row border px-3 py-2",
        step.kind === "gearItem" && "border-accent bg-accent-soft",
        complete && step.kind !== "gearItem" && "border-accent/30 bg-accent-soft",
        !complete && step.kind !== "gearItem" && "border-line bg-surface-2",
        complete && step.kind === "gearItem" && "border-accent/30 bg-accent-soft",
      )}
    >
      <span className="mt-1 w-5 flex-none text-right text-xs font-mono text-muted">
        {index + 1}.
      </span>
      <input
        type="checkbox"
        checked={complete}
        onChange={handleToggle}
        className="mt-1 h-4 w-4 flex-none accent-accent"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <WikiIcon filename={stepIcon(step)} alt="" size={18} />
          <span
            className={clsx(
              step.kind === "gearItem" ? "font-semibold" : "font-medium",
              complete ? "text-accent line-through" : "text-ink",
            )}
          >
            {stepLabel(step)}
          </span>
          <Badge tone={step.kind === "gearItem" ? "bronze" : "neutral"}>
            {KIND_LABEL[step.kind]}
          </Badge>
          {autoTracked && <Badge tone="magic">auto-tracked</Badge>}
        </div>
      </div>
    </li>
  );
}
