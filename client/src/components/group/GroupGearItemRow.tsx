import { Link } from "react-router-dom";
import { clsx } from "clsx";
import type { GearProgressionItem } from "../../types/gearProgression";
import { SLOT_LABELS, STYLE_LABELS } from "../../types/gearProgression";
import { Badge } from "../common/Badge";
import { WikiIcon } from "../common/WikiIcon";
import { ITEM_ICON } from "../../data/itemIcons";
import { useGearProgressionStore } from "../../state/useGearProgressionStore";

export function GroupGearItemRow({ item }: { item: GearProgressionItem }) {
  const count = useGearProgressionStore((s) => s.counts[item.id] ?? 0);
  const increment = useGearProgressionStore((s) => s.increment);
  const decrement = useGearProgressionStore((s) => s.decrement);
  const setCount = useGearProgressionStore((s) => s.setCount);

  return (
    <li
      className={clsx(
        "flex items-center gap-3 rounded-panel border p-3",
        count > 0 ? "border-accent/30 bg-accent-soft" : "border-line bg-surface-2",
      )}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <WikiIcon filename={ITEM_ICON[item.id]} alt="" size={24} />
          <Link
            to={`/gear/${item.id}`}
            className={clsx("font-medium hover:underline", count > 0 ? "text-accent" : "text-ink")}
          >
            {item.item}
          </Link>
          <Badge tone="neutral">{SLOT_LABELS[item.slot]}</Badge>
          <Badge tone={item.style}>{STYLE_LABELS[item.style]}</Badge>
        </div>
        <p className="mt-1 text-sm text-muted">{item.source}</p>
      </div>

      <div className="flex flex-none items-center gap-1.5">
        <button
          onClick={() => decrement(item.id)}
          disabled={count === 0}
          className="h-7 w-7 rounded-row border border-line-strong text-sm font-medium text-ink-2 hover:border-accent hover:text-accent disabled:opacity-40"
          title="Remove one from the group"
        >
          -
        </button>
        <input
          type="number"
          min={0}
          value={count}
          onChange={(e) => setCount(item.id, Number(e.target.value) || 0)}
          className="h-7 w-12 rounded-row border border-line-strong bg-surface text-center font-mono text-sm tabular-nums text-ink focus:border-accent focus:outline-none"
          title="Number of this item currently owned across the group"
        />
        <button
          onClick={() => increment(item.id)}
          className="h-7 w-7 rounded-row border border-line-strong text-sm font-medium text-ink-2 hover:border-accent hover:text-accent"
          title="Add one to the group"
        >
          +
        </button>
      </div>
    </li>
  );
}
