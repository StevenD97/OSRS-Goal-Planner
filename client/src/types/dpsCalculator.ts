export type CombatStyle = "melee" | "ranged" | "magic";
export type AttackType = "stab" | "slash" | "crush" | "ranged" | "magic";

export type DpsSlot =
  | "head"
  | "cape"
  | "neck"
  | "weapon"
  | "shield"
  | "body"
  | "legs"
  | "hands"
  | "feet"
  | "ring"
  | "ammo";

/** Aggregate combat bonuses - either from a single item or summed across a loadout. */
export interface CombatBonuses {
  attackStab: number;
  attackSlash: number;
  attackCrush: number;
  attackMagic: number;
  attackRanged: number;
  defenceStab: number;
  defenceSlash: number;
  defenceCrush: number;
  defenceMagic: number;
  defenceRanged: number;
  meleeStrength: number;
  rangedStrength: number;
  /** Percent, e.g. 10 = +10% */
  magicDamage: number;
  prayerBonus: number;
}

export const EMPTY_BONUSES: CombatBonuses = {
  attackStab: 0,
  attackSlash: 0,
  attackCrush: 0,
  attackMagic: 0,
  attackRanged: 0,
  defenceStab: 0,
  defenceSlash: 0,
  defenceCrush: 0,
  defenceMagic: 0,
  defenceRanged: 0,
  meleeStrength: 0,
  rangedStrength: 0,
  magicDamage: 0,
  prayerBonus: 0,
};

export interface DpsEquipmentItem {
  id: string;
  name: string;
  slot: DpsSlot;
  style: CombatStyle;
  /** Weapons only - the attack type used for the accuracy roll. */
  attackType?: AttackType;
  /** Weapons only - attack speed in game ticks (1 tick = 0.6s). */
  attackSpeed?: number;
  bonuses: Partial<CombatBonuses>;
  /** Links to a Gear Progression item of the same real-world item, for "gear you have" filtering. */
  gearProgressionId?: string;
  /** Base game item not gated behind any Gear Progression milestone - always "available". */
  alwaysAvailable?: boolean;
  notes?: string;
}

export type AttackStance = "accurate" | "aggressive" | "controlled" | "defensive" | "rapid" | "longrange" | "standard";

export interface Prayer {
  id: string;
  name: string;
  style: CombatStyle;
  attackPercent: number;
  strengthPercent: number;
  defencePercent: number;
  level: number;
}

export interface PotionBoost {
  id: string;
  name: string;
  /** Percent applied to base level, e.g. 15 = +15% */
  percent: number;
  /** Flat amount added after the percent. */
  flat: number;
  /** If true, boosts all five combat stats at once (overloads); otherwise only the selected style's stats. */
  allStats?: boolean;
}

export interface Spell {
  id: string;
  name: string;
  baseMaxHit: number;
  level: number;
}

export interface Monster {
  id: string;
  name: string;
  hitpoints: number;
  defenceLevel: number;
  magicLevel: number;
  defenceStab: number;
  defenceSlash: number;
  defenceCrush: number;
  defenceMagic: number;
  defenceRanged: number;
  isUndead?: boolean;
  isDemon?: boolean;
  slayerCategory?: string;
  notes?: string;
}

export interface DpsResult {
  effectiveAttackLevel: number;
  effectiveStrengthLevel: number;
  attackRoll: number;
  defenceRoll: number;
  hitChance: number;
  maxHit: number;
  averageDamage: number;
  dps: number;
  attacksPerSecond: number;
  timeToKillSeconds: number | null;
}
