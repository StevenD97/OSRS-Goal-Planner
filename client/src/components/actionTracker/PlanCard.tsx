import type { ActionPlan } from "../../types/actionTracker";
import { Panel } from "../common/Panel";
import { ProgressBar } from "../common/ProgressBar";
import { StepRow } from "./StepRow";
import { useAccountStore } from "../../state/useAccountStore";
import { useGearProgressionStore } from "../../state/useGearProgressionStore";
import { useActionTrackerStore } from "../../state/useActionTrackerStore";
import { isStepComplete } from "../../lib/actionPlan";

export function PlanCard({ plan }: { plan: ActionPlan }) {
  const members = useAccountStore((s) => s.members);
  const gearObtained = useGearProgressionStore((s) => s.obtained);
  const checked = useActionTrackerStore((s) => s.checked);
  const removePlan = useActionTrackerStore((s) => s.removePlan);

  const doneCount = plan.steps.filter((s) => isStepComplete(s, members, gearObtained, checked)).length;

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">Goal: {plan.targetLabel}</h2>
          <p className="mt-1 text-xs text-muted">
            {plan.steps.length} step{plan.steps.length === 1 ? "" : "s"} - added{" "}
            {new Date(plan.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex min-w-[140px] items-center gap-2">
            <ProgressBar value={plan.steps.length ? (doneCount / plan.steps.length) * 100 : 0} />
            <span className="text-xs text-muted">
              {doneCount}/{plan.steps.length}
            </span>
          </div>
          <button
            onClick={() => removePlan(plan.id)}
            className="flex-none text-xs text-muted hover:text-danger"
          >
            Remove
          </button>
        </div>
      </div>
      <ol className="mt-4 space-y-2">
        {plan.steps.map((step, i) => (
          <StepRow key={step.id} step={step} index={i} />
        ))}
      </ol>
    </Panel>
  );
}
