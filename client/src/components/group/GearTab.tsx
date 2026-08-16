import { useMemo } from "react";
import { GEAR_PROGRESSION } from "../../data/gearProgression";
import { Panel } from "../common/Panel";
import { ProgressBar } from "../common/ProgressBar";
import { GroupGearItemRow } from "./GroupGearItemRow";
import { useGearProgressionStore } from "../../state/useGearProgressionStore";

export function GearTab() {
  const counts = useGearProgressionStore((s) => s.counts);

  const allItems = useMemo(() => GEAR_PROGRESSION.flatMap((t) => t.items), []);
  const haveCount = allItems.filter((i) => (counts[i.id] ?? 0) > 0).length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <p className="max-w-2xl text-sm text-muted">
          Track how many of each progression item exist across the whole group. Bump the count up
          as items get looted, crafted, or bought - a count of 0 means the group still needs it to
          get everyone raid ready.
        </p>
        <div className="flex min-w-[200px] items-center gap-2">
          <ProgressBar value={allItems.length ? (haveCount / allItems.length) * 100 : 0} />
          <span className="flex-none text-sm text-muted">
            {haveCount}/{allItems.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {GEAR_PROGRESSION.map((tier) => {
          const tierHave = tier.items.filter((i) => (counts[i.id] ?? 0) > 0).length;
          return (
            <Panel key={tier.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-ink">{tier.name}</h2>
                  <p className="mt-1 max-w-2xl text-sm text-muted">{tier.description}</p>
                </div>
                <div className="flex min-w-[140px] flex-none items-center gap-2">
                  <ProgressBar value={tier.items.length ? (tierHave / tier.items.length) * 100 : 0} />
                  <span className="text-xs text-muted">
                    {tierHave}/{tier.items.length}
                  </span>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {tier.items.map((item) => (
                  <GroupGearItemRow key={item.id} item={item} />
                ))}
              </ul>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
