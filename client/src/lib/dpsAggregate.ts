import { DPS_EQUIPMENT } from "../data/dpsEquipment";
import { EMPTY_BONUSES } from "../types/dpsCalculator";
import type { CombatBonuses, DpsSlot } from "../types/dpsCalculator";

export const DPS_EQUIPMENT_BY_ID = Object.fromEntries(DPS_EQUIPMENT.map((i) => [i.id, i]));

/** Sums the bonuses of a set of equipped item ids (one per slot) into a single aggregate. */
export function aggregateEquipmentBonuses(equipped: Partial<Record<DpsSlot, string>>): CombatBonuses {
  const total: CombatBonuses = { ...EMPTY_BONUSES };
  for (const itemId of Object.values(equipped)) {
    if (!itemId) continue;
    const item = DPS_EQUIPMENT_BY_ID[itemId];
    if (!item) continue;
    for (const [key, value] of Object.entries(item.bonuses)) {
      total[key as keyof CombatBonuses] += value ?? 0;
    }
  }
  return total;
}
