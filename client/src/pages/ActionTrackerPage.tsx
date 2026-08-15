import { Link } from "react-router-dom";
import { useActionTrackerStore } from "../state/useActionTrackerStore";
import { PlanCard } from "../components/actionTracker/PlanCard";

export function ActionTrackerPage() {
  const plans = useActionTrackerStore((s) => s.plans);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-100">Action Tracker</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-400">
          Step-by-step plans toward a specific gear goal. Click "Aim for this next" on any item on
          the{" "}
          <Link to="/gear" className="text-amber-400 hover:underline">
            Gear Progression
          </Link>{" "}
          page to generate one - it expands every unmet quest and skill requirement (including a
          quest's own prerequisites, where mapped) into an ordered checklist. Quest and skill
          steps auto-check themselves once any linked account meets them; everything else you
          check off by hand.
        </p>
      </div>

      {plans.length === 0 ? (
        <p className="text-sm text-slate-500">
          No active plans yet. Head to{" "}
          <Link to="/gear" className="text-amber-400 hover:underline">
            Gear Progression
          </Link>{" "}
          and click "Aim for this next" on something you want.
        </p>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
}
