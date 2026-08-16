import { DPS_EQUIPMENT } from "../data/dpsEquipment";
import type { AttackType, CombatBonuses, CombatStyle, DpsEquipmentItem, DpsSlot } from "../types/dpsCalculator";

function attackTypeBonus(bonuses: Partial<CombatBonuses>, attackType: AttackType): number {
  if (attackType === "stab") return bonuses.attackStab ?? 0;
  if (attackType === "slash") return bonuses.attackSlash ?? 0;
  if (attackType === "crush") return bonuses.attackCrush ?? 0;
  if (attackType === "magic") return bonuses.attackMagic ?? 0;
  return bonuses.attackRanged ?? 0;
}

/**
 * A simple greedy heuristic, not a true joint optimizer: ranks each slot's
 * candidates independently by (strength/ranged-strength/magic-damage,
 * weighted highest) plus the relevant accuracy bonus, then picks the top
 * one per slot. Good enough to answer "what's the best gear I actually
 * have access to," not meant to reproduce a full simulated-annealing BiS
 * search.
 */
function itemScore(item: DpsEquipmentItem, attackType: AttackType): number {
  const b = item.bonuses;
  const offense = (b.meleeStrength ?? 0) + (b.rangedStrength ?? 0) + (b.magicDamage ?? 0) * 3;
  const accuracy = attackTypeBonus(b, attackType);
  return offense * 3 + accuracy;
}

export function isItemAvailable(item: DpsEquipmentItem, obtainedGearIds: Set<string>): boolean {
  if (item.alwaysAvailable) return true;
  if (item.gearProgressionId) return obtainedGearIds.has(item.gearProgressionId);
  return false;
}

export function suggestLoadout(
  style: CombatStyle,
  attackType: AttackType,
  obtainedGearIds: Set<string>,
  onlyOwned: boolean,
): Partial<Record<DpsSlot, string>> {
  const bySlot = new Map<DpsSlot, DpsEquipmentItem[]>();
  for (const item of DPS_EQUIPMENT) {
    if (item.style !== style) continue;
    if (onlyOwned && !isItemAvailable(item, obtainedGearIds)) continue;
    const list = bySlot.get(item.slot) ?? [];
    list.push(item);
    bySlot.set(item.slot, list);
  }

  const result: Partial<Record<DpsSlot, string>> = {};
  for (const [slot, items] of bySlot) {
    const best = items.reduce((a, b) => (itemScore(b, attackType) > itemScore(a, attackType) ? b : a));
    result[slot] = best.id;
  }
  return result;
}
