import { clsx } from "clsx";
import type { GearProgressionItem } from "../../types/gearProgression";
import { SLOT_LABELS, STYLE_LABELS } from "../../types/gearProgression";
import { Badge } from "../common/Badge";
import { useGearProgressionStore } from "../../state/useGearProgressionStore";

const STYLE_TONE = {
  melee: "red",
  ranged: "green",
  magic: "blue",
  shared: "amber",
} as const;

export function GearItemCard({ item, showStyleBadge = true }: { item: GearProgressionItem; showStyleBadge?: boolean }) {
  const obtained = useGearProgressionStore((s) => !!s.obtained[item.id]);
  const toggle = useGearProgressionStore((s) => s.toggle);

  return (
    <li
      className={clsx(
        "flex items-start gap-3 rounded-lg border p-3",
        obtained ? "border-emerald-800 bg-emerald-500/5" : "border-slate-800 bg-slate-900/40",
      )}
    >
      <input
        type="checkbox"
        checked={obtained}
        onChange={() => toggle(item.id)}
        className="mt-1 h-4 w-4 flex-none accent-amber-500"
        title="Mark as obtained"
      />
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={clsx(
              "font-medium",
              obtained ? "text-emerald-400 line-through" : "text-slate-100",
            )}
          >
            {item.item}
          </span>
          <Badge tone="neutral">{SLOT_LABELS[item.slot]}</Badge>
          {showStyleBadge && (
            <Badge tone={STYLE_TONE[item.style]}>{STYLE_LABELS[item.style]}</Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-400">{item.source}</p>
        {item.requirements && (
          <p className="mt-0.5 text-xs text-slate-500">Requires: {item.requirements}</p>
        )}
        {item.notes && <p className="mt-0.5 text-xs text-slate-500 italic">{item.notes}</p>}
      </div>
    </li>
  );
}
