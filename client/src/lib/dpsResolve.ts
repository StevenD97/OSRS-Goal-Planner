import type { CombatBonuses, CombatStyle, DpsResult, Monster } from "../types/dpsCalculator";
import type { AttackType } from "../types/dpsCalculator";
import {
  attackRoll,
  attacksPerSecond,
  defenceRoll,
  dps as dpsFormula,
  effectiveLevel,
  hitChance,
  magicMaxHit,
  meleeOrRangedMaxHit,
  timeToKillSeconds,
} from "./combatFormulas";

type Stance = "accurate" | "aggressive" | "controlled" | "defensive" | "rapid" | "longrange" | "standard";

export function getStyleBonuses(style: CombatStyle, stance: Stance): { attack: number; strength: number; defence: number } {
  if (style === "melee") {
    if (stance === "accurate") return { attack: 3, strength: 0, defence: 0 };
    if (stance === "aggressive") return { attack: 0, strength: 3, defence: 0 };
    if (stance === "controlled") return { attack: 1, strength: 1, defence: 1 };
    if (stance === "defensive") return { attack: 0, strength: 0, defence: 3 };
    return { attack: 0, strength: 0, defence: 0 };
  }
  if (style === "ranged") {
    if (stance === "accurate") return { attack: 3, strength: 3, defence: 0 };
    if (stance === "longrange") return { attack: 0, strength: 0, defence: 3 };
    return { attack: 0, strength: 0, defence: 0 };
  }
  // magic
  if (stance === "defensive") return { attack: 0, strength: 0, defence: 3 };
  return { attack: 0, strength: 0, defence: 0 };
}

function targetDefenceBonus(monster: Monster, attackType: AttackType): number {
  switch (attackType) {
    case "stab":
      return monster.defenceStab;
    case "slash":
      return monster.defenceSlash;
    case "crush":
      return monster.defenceCrush;
    case "magic":
      return monster.defenceMagic;
    case "ranged":
      return monster.defenceRanged;
  }
}

export interface ResolveInput {
  style: CombatStyle;
  attackType: AttackType;
  attackSpeedTicks: number;
  levels: { attack: number; strength: number; defence: number; ranged: number; magic: number };
  prayerAttackPercent: number;
  prayerStrengthPercent: number;
  prayerDefencePercent: number;
  potionPercent: number;
  potionFlat: number;
  stance: Stance;
  bonuses: CombatBonuses;
  spellBaseMaxHit?: number;
  /** Extra damage% multiplier already resolved from task/undead/weapon-passive modifiers. */
  extraDamagePercent: number;
  /** Extra accuracy% multiplier from the same sources. */
  extraAccuracyPercent: number;
  monster: Monster;
}

export function resolveDps(input: ResolveInput): DpsResult {
  const {
    style,
    attackType,
    attackSpeedTicks,
    levels,
    prayerAttackPercent,
    prayerStrengthPercent,
    potionPercent,
    potionFlat,
    stance,
    bonuses,
    spellBaseMaxHit,
    extraDamagePercent,
    extraAccuracyPercent,
    monster,
  } = input;

  const styleBonus = getStyleBonuses(style, stance);
  const boostedAttack = levels.attack + Math.floor(levels.attack * (potionPercent / 100)) + potionFlat;
  const boostedStrength = levels.strength + Math.floor(levels.strength * (potionPercent / 100)) + potionFlat;
  const boostedRanged = levels.ranged + Math.floor(levels.ranged * (potionPercent / 100)) + potionFlat;
  const boostedMagic = levels.magic; // magic level is not boosted by combat potions

  const attackLevelForStyle = style === "melee" ? boostedAttack : style === "ranged" ? boostedRanged : boostedMagic;
  const strengthLevelForStyle = style === "melee" ? boostedStrength : boostedRanged;

  const effectiveAttackLevel = effectiveLevel(attackLevelForStyle, prayerAttackPercent, styleBonus.attack);
  const effectiveStrengthLevel = effectiveLevel(strengthLevelForStyle, prayerStrengthPercent, styleBonus.strength);
  // Defensive/longrange stance boosts the *player's* defence (survivability), which this
  // DPS-only calculator doesn't model - styleBonus.defence is intentionally unused here.
  // The defence roll below is the *target's*, computed from its own defence level.
  const targetEffectiveDefenceLevel = monster.defenceLevel + 8;

  const attackBonus =
    attackType === "stab"
      ? bonuses.attackStab
      : attackType === "slash"
        ? bonuses.attackSlash
        : attackType === "crush"
          ? bonuses.attackCrush
          : attackType === "magic"
            ? bonuses.attackMagic
            : bonuses.attackRanged;

  const atkRoll = attackRoll(effectiveAttackLevel, attackBonus, extraAccuracyPercent);
  const defRoll = defenceRoll(targetEffectiveDefenceLevel, targetDefenceBonus(monster, attackType));
  const chance = hitChance(atkRoll, defRoll);

  const maxHitValue =
    style === "magic"
      ? magicMaxHit((spellBaseMaxHit ?? 0), bonuses.magicDamage + extraDamagePercent)
      : meleeOrRangedMaxHit(effectiveStrengthLevel, bonuses.meleeStrength || bonuses.rangedStrength, extraDamagePercent);

  const dpsValue = dpsFormula(chance, maxHitValue, attackSpeedTicks);

  return {
    effectiveAttackLevel,
    effectiveStrengthLevel,
    attackRoll: atkRoll,
    defenceRoll: defRoll,
    hitChance: chance,
    maxHit: maxHitValue,
    averageDamage: chance * (maxHitValue / 2),
    dps: dpsValue,
    attacksPerSecond: attacksPerSecond(attackSpeedTicks),
    timeToKillSeconds: timeToKillSeconds(dpsValue, monster.hitpoints),
  };
}
