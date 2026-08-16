import { DPS_EQUIPMENT } from "../../data/dpsEquipment";
import { isItemAvailable } from "../../lib/loadoutOptimizer";
import type { CombatStyle, DpsSlot } from "../../types/dpsCalculator";

const SLOT_LABELS: Record<DpsSlot, string> = {
  head: "Head",
  cape: "Cape",
  neck: "Neck",
  weapon: "Weapon",
  shield: "Shield",
  body: "Body",
  legs: "Legs",
  hands: "Hands",
  feet: "Feet",
  ring: "Ring",
  ammo: "Ammo",
};

export function EquipmentSlotSelect({
  slot,
  style,
  value,
  onChange,
  obtainedGearIds,
}: {
  slot: DpsSlot;
  style: CombatStyle;
  value: string | undefined;
  onChange: (itemId: string | null) => void;
  obtainedGearIds: Set<string>;
}) {
  const options = DPS_EQUIPMENT.filter((item) => item.slot === slot && item.style === style);
  if (options.length === 0) return null;

  return (
    <label className="flex items-center justify-between gap-3 text-sm">
      <span className="w-16 flex-none text-muted">{SLOT_LABELS[slot]}</span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="min-w-0 flex-1 rounded-row border border-line-strong bg-surface px-2 py-1.5 text-sm text-ink"
      >
        <option value="">- empty -</option>
        {options.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
            {!isItemAvailable(item, obtainedGearIds) ? " (not obtained)" : ""}
          </option>
        ))}
      </select>
    </label>
  );
}
