/**
 * Core OSRS combat math. Formulas match the OSRS Wiki's documented melee/
 * ranged/magic damage-per-second pages: an effective level (visible level,
 * prayer %, then style/stance bonus and the universal +8), an attack roll
 * vs a defence roll to get hit chance, and a max hit from effective
 * Strength (or, for magic, the spell's own base damage scaled by magic
 * damage %). Percentage damage/accuracy modifiers (slayer helm, salve
 * amulet, etc.) are applied as a single combined multiplier at the end,
 * which is how community calculators (e.g. the OSRS Wiki's DPS calc)
 * handle multiple simultaneous modifiers.
 */

/** floor(floor(level * (1 + prayerPercent/100)) + styleBonus + 8) */
export function effectiveLevel(baseLevel: number, prayerPercent: number, styleBonus: number): number {
  return Math.floor(baseLevel * (1 + prayerPercent / 100)) + styleBonus + 8;
}

/** Melee/ranged max hit from effective Strength level and strength bonus. */
export function meleeOrRangedMaxHit(
  effectiveStrengthLevel: number,
  strengthBonus: number,
  damageMultiplierPercent = 0,
): number {
  const base = Math.floor(0.5 + (effectiveStrengthLevel * (strengthBonus + 64)) / 640);
  return Math.floor(base * (1 + damageMultiplierPercent / 100));
}

/** Magic max hit: spell base damage scaled by total magic damage % bonus. */
export function magicMaxHit(spellBaseMaxHit: number, magicDamagePercent: number): number {
  return Math.floor(spellBaseMaxHit * (1 + magicDamagePercent / 100));
}

export function attackRoll(
  effectiveAttackLevel: number,
  attackBonus: number,
  accuracyMultiplierPercent = 0,
): number {
  const base = effectiveAttackLevel * (attackBonus + 64);
  return Math.floor(base * (1 + accuracyMultiplierPercent / 100));
}

export function defenceRoll(effectiveDefenceLevel: number, defenceBonus: number): number {
  return effectiveDefenceLevel * (defenceBonus + 64);
}

/** Standard OSRS attack-roll-vs-defence-roll hit chance, 0-1. */
export function hitChance(atkRoll: number, defRoll: number): number {
  if (atkRoll <= 0) return 0;
  if (atkRoll > defRoll) {
    return 1 - (defRoll + 2) / (2 * (atkRoll + 1));
  }
  return atkRoll / (2 * (defRoll + 1));
}

/** Average damage of a successful hit, assuming uniform 0..max. */
export function averageHitDamage(maxHitValue: number): number {
  return maxHitValue / 2;
}

/** Attacks per second from a weapon's speed in game ticks (1 tick = 0.6s). */
export function attacksPerSecond(attackSpeedTicks: number): number {
  return 1 / (attackSpeedTicks * 0.6);
}

export function dps(hitChanceValue: number, maxHitValue: number, attackSpeedTicks: number): number {
  return hitChanceValue * averageHitDamage(maxHitValue) * attacksPerSecond(attackSpeedTicks);
}

export function timeToKillSeconds(dpsValue: number, targetHp: number): number | null {
  if (dpsValue <= 0) return null;
  return targetHp / dpsValue;
}
