import type { GearProgressionTier } from "../../types/gearProgression";
import { Panel } from "../common/Panel";
import { ProgressBar } from "../common/ProgressBar";
import { GearItemCard } from "./GearItemCard";
import { useGearProgressionStore } from "../../state/useGearProgressionStore";

export function TierSection({
  tier,
  items,
  showStyleBadge,
}: {
  tier: GearProgressionTier;
  items: GearProgressionTier["items"];
  showStyleBadge: boolean;
}) {
  const obtained = useGearProgressionStore((s) => s.obtained);
  const done = items.filter((i) => obtained[i.id]).length;

  if (items.length === 0) return null;

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-ink">{tier.name}</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">{tier.description}</p>
        </div>
        <div className="flex min-w-[140px] flex-none items-center gap-2">
          <ProgressBar value={items.length ? (done / items.length) * 100 : 0} />
          <span className="text-xs text-muted">
            {done}/{items.length}
          </span>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <GearItemCard key={item.id} item={item} showStyleBadge={showStyleBadge} />
        ))}
      </ul>
    </Panel>
  );
}
