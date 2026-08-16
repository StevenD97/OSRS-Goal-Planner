import { Link } from "react-router-dom";
import { clsx } from "clsx";
import type { GearProgressionItem } from "../../types/gearProgression";
import { SLOT_LABELS, STYLE_LABELS } from "../../types/gearProgression";
import { Badge } from "../common/Badge";
import { WikiIcon } from "../common/WikiIcon";
import { ITEM_ICON } from "../../data/itemIcons";
import { useGearProgressionStore } from "../../state/useGearProgressionStore";
import { useActionTrackerStore } from "../../state/useActionTrackerStore";

export function GearItemCard({ item, showStyleBadge = true }: { item: GearProgressionItem; showStyleBadge?: boolean }) {
  const obtained = useGearProgressionStore((s) => !!s.obtained[item.id]);
  const toggle = useGearProgressionStore((s) => s.toggle);
  const hasPlan = useActionTrackerStore((s) => s.hasPlanForItem(item.id));
  const addPlan = useActionTrackerStore((s) => s.addPlan);

  return (
    <li
      className={clsx(
        "flex items-start gap-3 rounded-panel border p-3",
        obtained ? "border-accent/30 bg-accent-soft" : "border-line bg-surface-2",
      )}
    >
      <input
        type="checkbox"
        checked={obtained}
        onChange={() => toggle(item.id)}
        className="mt-1 h-4 w-4 flex-none accent-accent"
        title="Mark as obtained"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <WikiIcon filename={ITEM_ICON[item.id]} alt="" size={24} />
          <Link
            to={`/gear/${item.id}`}
            className={clsx(
              "font-medium hover:underline",
              obtained ? "text-accent line-through" : "text-ink",
            )}
          >
            {item.item}
          </Link>
          <Badge tone="neutral">{SLOT_LABELS[item.slot]}</Badge>
          {showStyleBadge && (
            <Badge tone={item.style}>{STYLE_LABELS[item.style]}</Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{item.source}</p>
        {item.requirements && (
          <p className="mt-0.5 text-xs text-muted">Requires: {item.requirements}</p>
        )}
        {item.notes && <p className="mt-0.5 text-xs text-muted italic">{item.notes}</p>}
      </div>
      {!obtained &&
        (hasPlan ? (
          <Link
            to="/action-tracker"
            onClick={() => addPlan(item)}
            className="flex-none self-start rounded-row border border-accent px-2.5 py-1 text-xs font-medium text-accent hover:bg-accent-soft"
            title="Refreshes the plan's steps against the latest requirement data before opening it"
          >
            In tracker &rarr;
          </Link>
        ) : (
          <button
            onClick={() => addPlan(item)}
            className="flex-none self-start rounded-row border border-line-strong px-2.5 py-1 text-xs font-medium text-ink-2 hover:border-accent hover:text-accent"
          >
            Aim for this next
          </button>
        ))}
    </li>
  );
}
