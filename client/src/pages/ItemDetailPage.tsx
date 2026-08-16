import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { GEAR_PROGRESSION_BY_ID } from "../data/gearProgression";
import { SLOT_LABELS, STYLE_LABELS } from "../types/gearProgression";
import { Panel } from "../components/common/Panel";
import { Badge } from "../components/common/Badge";
import { StepRow } from "../components/actionTracker/StepRow";
import { useAccountStore } from "../state/useAccountStore";
import { useGearProgressionStore } from "../state/useGearProgressionStore";
import { useActionTrackerStore } from "../state/useActionTrackerStore";
import { resolveActionPlan, isStepComplete } from "../lib/actionPlan";

export function ItemDetailPage() {
  const { itemId } = useParams<{ itemId: string }>();
  const item = itemId ? GEAR_PROGRESSION_BY_ID[itemId] : undefined;

  const members = useAccountStore((s) => s.members);
  const gearObtainedMap = useGearProgressionStore((s) => s.obtained);
  const toggleObtained = useGearProgressionStore((s) => s.toggle);
  const checked = useActionTrackerStore((s) => s.checked);
  const hasPlan = useActionTrackerStore((s) => (item ? s.hasPlanForItem(item.id) : false));
  const addPlan = useActionTrackerStore((s) => s.addPlan);

  const steps = useMemo(() => (item ? resolveActionPlan(item) : []), [item]);

  if (!item) {
    return (
      <Panel>
        <p className="text-sm text-muted">
          Couldn't find that item.{" "}
          <Link to="/gear" className="text-accent hover:underline">
            Back to Gear Progression
          </Link>
        </p>
      </Panel>
    );
  }

  const obtained = !!gearObtainedMap[item.id];
  const doneCount = steps.filter((s) => isStepComplete(s, members, gearObtainedMap, checked)).length;

  return (
    <div className="max-w-3xl">
      <Link to="/gear" className="text-sm text-muted hover:text-accent">
        &larr; Gear Progression
      </Link>

      <div className="mt-2 mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink">{item.item}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge tone="neutral">{SLOT_LABELS[item.slot]}</Badge>
            <Badge tone={item.style}>{STYLE_LABELS[item.style]}</Badge>
          </div>
          <p className="mt-3 max-w-xl text-sm text-muted">{item.source}</p>
          {item.requirements && (
            <p className="mt-1 text-xs text-muted">Requires: {item.requirements}</p>
          )}
          {item.notes && <p className="mt-1 text-xs text-muted italic">{item.notes}</p>}
        </div>

        <label className="flex flex-none items-center gap-2 rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink-2">
          <input
            type="checkbox"
            checked={obtained}
            onChange={() => toggleObtained(item.id)}
            className="h-4 w-4 accent-accent"
          />
          I have this
        </label>
      </div>

      {members.length === 0 ? (
        <Panel className="mb-4 border-accent/40 bg-accent-soft">
          <p className="text-sm text-ink-2">
            Link your account (or your whole Group Ironman roster) in{" "}
            <Link to="/settings" className="text-accent hover:underline">
              Settings
            </Link>{" "}
            to get this recommendation personalized against your actual levels and quest
            completion - every step below currently shows as not-yet-done since nothing is
            synced.
          </p>
        </Panel>
      ) : members.length > 1 ? (
        <p className="mb-4 text-sm text-muted">
          Recommended path for your group of {members.length} - a step counts as done if{" "}
          <em>any</em> member has it.
        </p>
      ) : null}

      <Panel>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Recommended path</h2>
          <span className="text-xs text-muted">
            {doneCount}/{steps.length} done
          </span>
        </div>
        <ol className="mt-4 space-y-2">
          {steps.map((step, i) => (
            <StepRow key={step.id} step={step} index={i} />
          ))}
        </ol>
      </Panel>

      <div className="mt-4 flex justify-end">
        {obtained ? (
          <span className="text-sm font-medium text-accent">You already have this.</span>
        ) : hasPlan ? (
          <Link
            to="/action-tracker"
            onClick={() => addPlan(item)}
            className="rounded-row border border-accent px-4 py-2 text-sm font-medium text-accent hover:bg-accent-soft"
          >
            In tracker &rarr;
          </Link>
        ) : (
          <button
            onClick={() => addPlan(item)}
            className="rounded-row bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong"
          >
            Add to Action Tracker
          </button>
        )}
      </div>
    </div>
  );
}
