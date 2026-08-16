import type { DpsEquipmentItem } from "../types/dpsCalculator";

/**
 * A curated equipment set (not exhaustive - OSRS has thousands of items)
 * spanning early game to best-in-slot per style, with real combat bonus
 * values researched against long-stable, well-documented item stats.
 * `gearProgressionId` links back to data/gearProgression.ts so the
 * "obtained" checkbox there drives the loadout optimizer's "gear I have"
 * filter. Attack speeds are in game ticks (1 tick = 0.6s).
 *
 * These numbers are a solid approximation, not a byte-for-byte mirror of
 * the game's item database - a few unique weapon passives are deliberately
 * not modeled (Twisted bow's magic-level accuracy/damage scaling,
 * Scythe of Vitur's 3-hit cleave, Osmumten's fang's reroll-low-rolls
 * mechanic) since getting those formulas wrong would be worse than not
 * modeling them. Flagged inline. Use the "custom bonuses" override in the
 * calculator if you need exact numbers for one of these.
 */
export const DPS_EQUIPMENT: DpsEquipmentItem[] = [
  // ---------- MELEE WEAPONS ----------
  {
    id: "w-rune-scimitar",
    name: "Rune scimitar",
    slot: "weapon",
    style: "melee",
    attackType: "slash",
    attackSpeed: 4,
    bonuses: { attackSlash: 45, meleeStrength: 44 },
    alwaysAvailable: true,
  },
  {
    id: "w-dragon-scimitar",
    name: "Dragon scimitar",
    slot: "weapon",
    style: "melee",
    attackType: "slash",
    attackSpeed: 4,
    bonuses: { attackSlash: 67, meleeStrength: 66 },
    gearProgressionId: "eg-melee-weapon",
  },
  {
    id: "w-abyssal-whip",
    name: "Abyssal whip",
    slot: "weapon",
    style: "melee",
    attackType: "slash",
    attackSpeed: 4,
    bonuses: { attackSlash: 82, meleeStrength: 82 },
    gearProgressionId: "fg-cape-melee",
  },
  {
    id: "w-ghrazi-rapier",
    name: "Ghrazi rapier",
    slot: "weapon",
    style: "melee",
    attackType: "stab",
    attackSpeed: 4,
    bonuses: { attackStab: 94, meleeStrength: 75 },
    gearProgressionId: "tob-weapon-accurate",
  },
  {
    id: "w-osmumtens-fang",
    name: "Osmumten's fang",
    slot: "weapon",
    style: "melee",
    attackType: "stab",
    attackSpeed: 5,
    bonuses: { attackStab: 105, meleeStrength: 79 },
    gearProgressionId: "toa-melee-weapon",
    notes: "In-game, the Fang rerolls unusually low damage rolls (better real accuracy than base stats suggest) - not modeled here.",
  },
  {
    id: "w-scythe-of-vitur",
    name: "Scythe of Vitur",
    slot: "weapon",
    style: "melee",
    attackType: "slash",
    attackSpeed: 5,
    bonuses: { attackSlash: 125, meleeStrength: 75 },
    gearProgressionId: "tob-weapon-large",
    notes: "Hits up to 3 times (100%/50%/25%) on large targets - this calculator models a single hit only, so treat DPS as a floor against multi-tile targets.",
  },

  // ---------- MELEE ARMOR ----------
  { id: "a-rune-platebody", name: "Rune platebody", slot: "body", style: "melee", bonuses: { defenceStab: 66, defenceSlash: 68, defenceCrush: 62 }, alwaysAvailable: true },
  { id: "a-rune-platelegs", name: "Rune platelegs", slot: "legs", style: "melee", bonuses: { defenceStab: 38, defenceSlash: 39, defenceCrush: 37 }, alwaysAvailable: true },
  { id: "a-fighter-torso", name: "Fighter torso", slot: "body", style: "melee", bonuses: { defenceStab: 32, defenceSlash: 31, defenceCrush: 30, meleeStrength: 4 }, gearProgressionId: "fg-torso" },
  { id: "a-bandos-chestplate", name: "Bandos chestplate", slot: "body", style: "melee", bonuses: { defenceStab: 73, defenceSlash: 70, defenceCrush: 66, meleeStrength: 4 }, gearProgressionId: "prb-bandos" },
  { id: "a-bandos-tassets", name: "Bandos tassets", slot: "legs", style: "melee", bonuses: { defenceStab: 65, defenceSlash: 62, defenceCrush: 59, meleeStrength: 4 }, gearProgressionId: "prb-bandos" },
  { id: "a-torva-platebody", name: "Torva platebody", slot: "body", style: "melee", bonuses: { defenceStab: 82, defenceSlash: 80, defenceCrush: 78, meleeStrength: 6 }, gearProgressionId: "eg2-melee-armor" },
  { id: "a-torva-platelegs", name: "Torva platelegs", slot: "legs", style: "melee", bonuses: { defenceStab: 74, defenceSlash: 72, defenceCrush: 70, meleeStrength: 4 }, gearProgressionId: "eg2-melee-armor" },
  { id: "a-justiciar-chest", name: "Justiciar chestguard", slot: "body", style: "melee", bonuses: { defenceStab: 90, defenceSlash: 92, defenceCrush: 88 }, gearProgressionId: "tob-armor" },

  { id: "s-dragon-defender", name: "Dragon defender", slot: "shield", style: "melee", bonuses: { attackStab: 12, attackSlash: 12, attackCrush: 12, meleeStrength: 8, defenceStab: 15, defenceSlash: 15, defenceCrush: 15 }, gearProgressionId: "fg-defender" },
  { id: "s-avernic-defender", name: "Avernic defender", slot: "shield", style: "melee", bonuses: { attackStab: 20, attackSlash: 20, attackCrush: 20, meleeStrength: 12, defenceStab: 20, defenceSlash: 20, defenceCrush: 20 }, gearProgressionId: "tob-defender" },
  { id: "s-dinhs-bulwark", name: "Dinh's bulwark", slot: "shield", style: "melee", bonuses: { meleeStrength: 15, defenceStab: 96, defenceSlash: 92, defenceCrush: 96 }, gearProgressionId: "cox-shield" },

  { id: "h-torva-helm", name: "Torva full helm", slot: "head", style: "melee", bonuses: { defenceStab: 42, defenceSlash: 40, defenceCrush: 38, meleeStrength: 2 }, gearProgressionId: "eg2-melee-armor" },
  { id: "n-amulet-of-fury", name: "Amulet of fury", slot: "neck", style: "melee", bonuses: { attackStab: 10, attackSlash: 10, attackCrush: 10, meleeStrength: 10, defenceStab: 10, defenceSlash: 10, defenceCrush: 10 }, alwaysAvailable: true },
  { id: "n-amulet-of-torture", name: "Amulet of torture", slot: "neck", style: "melee", bonuses: { attackStab: 15, attackSlash: 15, attackCrush: 15, meleeStrength: 15 }, gearProgressionId: "prps-jewelry" },
  { id: "g-barrows-gloves", name: "Barrows gloves", slot: "hands", style: "melee", bonuses: { attackStab: 12, attackSlash: 12, attackCrush: 12, meleeStrength: 12, defenceStab: 12, defenceSlash: 12, defenceCrush: 12 }, gearProgressionId: "fg-gloves" },
  { id: "g-ferocious-gloves", name: "Ferocious gloves", slot: "hands", style: "melee", bonuses: { attackSlash: 4, meleeStrength: 14 }, notes: "From the Hallowed Sepulchre - not yet tracked in Gear Progression." },
  { id: "b-primordial-boots", name: "Primordial boots", slot: "feet", style: "melee", bonuses: { meleeStrength: 6, defenceStab: 8, defenceSlash: 6, defenceCrush: 10 }, notes: "From Kraken - not yet tracked in Gear Progression." },
  { id: "b-avernic-treads", name: "Avernic treads", slot: "feet", style: "melee", bonuses: { meleeStrength: 6, defenceStab: 11, defenceSlash: 8, defenceCrush: 13 }, gearProgressionId: "eg2-dom-boots" },
  { id: "r-berserker-ring-i", name: "Berserker ring (i)", slot: "ring", style: "melee", bonuses: { meleeStrength: 8 }, gearProgressionId: "fg-ring" },
  { id: "r-ultor-ring", name: "Ultor ring", slot: "ring", style: "melee", bonuses: { meleeStrength: 12 }, gearProgressionId: "dt2-ring-melee" },
  { id: "c-fire-cape", name: "Fire cape", slot: "cape", style: "melee", bonuses: { defenceStab: 10, defenceSlash: 10, defenceCrush: 10 }, gearProgressionId: "fg-cape-melee" },
  { id: "c-infernal-cape", name: "Infernal cape", slot: "cape", style: "melee", bonuses: { meleeStrength: 4, defenceStab: 10, defenceSlash: 10, defenceCrush: 10 }, gearProgressionId: "eg2-cape" },

  // ---------- RANGED WEAPONS ----------
  { id: "w-rune-crossbow", name: "Rune crossbow", slot: "weapon", style: "ranged", attackType: "ranged", attackSpeed: 5, bonuses: { attackRanged: 90 }, alwaysAvailable: true },
  { id: "w-magic-shortbow", name: "Magic shortbow", slot: "weapon", style: "ranged", attackType: "ranged", attackSpeed: 4, bonuses: { attackRanged: 69 }, alwaysAvailable: true },
  {
    id: "w-toxic-blowpipe",
    name: "Toxic blowpipe",
    slot: "weapon",
    style: "ranged",
    attackType: "ranged",
    attackSpeed: 3,
    bonuses: { attackRanged: 80, rangedStrength: 80 },
    gearProgressionId: "prps-ranged-weapon",
    notes: "Self-ammo'd (loaded darts) - no separate ammo slot needed.",
  },
  {
    id: "w-bowfa",
    name: "Bow of faerdhinen (c)",
    slot: "weapon",
    style: "ranged",
    attackType: "ranged",
    attackSpeed: 4,
    bonuses: { attackRanged: 128, rangedStrength: 72 },
    gearProgressionId: "gc-weapon",
    notes: "Self-ammo'd (crystal bolts drawn from the bow itself).",
  },
  {
    id: "w-twisted-bow",
    name: "Twisted bow",
    slot: "weapon",
    style: "ranged",
    attackType: "ranged",
    attackSpeed: 5,
    bonuses: { attackRanged: 70, rangedStrength: 20 },
    gearProgressionId: "cox-ranged-weapon",
    notes: "Base stats only - its real accuracy/damage scale up sharply against high-magic targets via a unique formula not modeled here. Treat this calculator's output as a floor, not the true number, for magic-heavy targets.",
  },
  { id: "w-zaryte-crossbow", name: "Zaryte crossbow", slot: "weapon", style: "ranged", attackType: "ranged", attackSpeed: 5, bonuses: { attackRanged: 110, rangedStrength: 12 }, gearProgressionId: "eg2-ranged-weapon" },

  { id: "ammo-broad-bolts", name: "Broad bolts", slot: "ammo", style: "ranged", bonuses: { attackRanged: 10, rangedStrength: 32 }, alwaysAvailable: true },
  { id: "ammo-amethyst-arrows", name: "Amethyst arrows", slot: "ammo", style: "ranged", bonuses: { attackRanged: 45, rangedStrength: 47 }, alwaysAvailable: true },
  { id: "ammo-dragon-bolts", name: "Dragon bolts", slot: "ammo", style: "ranged", bonuses: { attackRanged: 22, rangedStrength: 100 }, alwaysAvailable: true },

  { id: "a-black-dhide-body", name: "Black d'hide body", slot: "body", style: "ranged", bonuses: { defenceRanged: 60, attackRanged: 0 }, alwaysAvailable: true },
  { id: "a-karils-top", name: "Karil's leathertop", slot: "body", style: "ranged", bonuses: { defenceRanged: 51, rangedStrength: 3 }, gearProgressionId: "fg-ranged-armor" },
  { id: "a-karils-skirt", name: "Karil's leatherskirt", slot: "legs", style: "ranged", bonuses: { defenceRanged: 49, rangedStrength: 2 }, gearProgressionId: "fg-ranged-armor" },
  { id: "a-armadyl-chest", name: "Armadyl chestplate", slot: "body", style: "ranged", bonuses: { defenceRanged: 68, rangedStrength: 6 }, gearProgressionId: "prb-armadyl" },
  { id: "a-armadyl-chaps", name: "Armadyl chainskirt", slot: "legs", style: "ranged", bonuses: { defenceRanged: 51, rangedStrength: 4 }, gearProgressionId: "prb-armadyl" },
  { id: "a-crystal-body", name: "Crystal body", slot: "body", style: "ranged", bonuses: { defenceRanged: 66, rangedStrength: 4 }, gearProgressionId: "gc-armor" },
  { id: "a-crystal-legs", name: "Crystal legs", slot: "legs", style: "ranged", bonuses: { defenceRanged: 47, rangedStrength: 3 }, gearProgressionId: "gc-armor" },
  { id: "a-masori-chest", name: "Masori chestplate", slot: "body", style: "ranged", bonuses: { defenceRanged: 73, rangedStrength: 6 }, gearProgressionId: "toa-ranged-armor" },
  { id: "a-masori-chaps", name: "Masori chaps", slot: "legs", style: "ranged", bonuses: { defenceRanged: 56, rangedStrength: 4 }, gearProgressionId: "toa-ranged-armor" },

  { id: "h-masori-mask", name: "Masori mask", slot: "head", style: "ranged", bonuses: { defenceRanged: 30, rangedStrength: 3 }, gearProgressionId: "toa-ranged-armor" },
  { id: "h-serpentine-helm", name: "Serpentine helm", slot: "head", style: "ranged", bonuses: { defenceRanged: 24, rangedStrength: 3 }, notes: "From Zulrah - not yet tracked in Gear Progression." },
  { id: "n-necklace-of-anguish", name: "Necklace of anguish", slot: "neck", style: "ranged", bonuses: { attackRanged: 15, rangedStrength: 15 }, gearProgressionId: "prps-jewelry" },
  { id: "g-zaryte-vambraces", name: "Zaryte vambraces", slot: "hands", style: "ranged", bonuses: { attackRanged: 8, rangedStrength: 4 }, gearProgressionId: "eg2-ranged-gloves" },
  { id: "b-pegasian-boots", name: "Pegasian boots", slot: "feet", style: "ranged", bonuses: { rangedStrength: 4, defenceRanged: 6 }, notes: "From the Grotesque Guardians - not yet tracked in Gear Progression." },
  { id: "r-archers-ring-i", name: "Archers' ring (i)", slot: "ring", style: "ranged", bonuses: { rangedStrength: 8 }, gearProgressionId: "fg-ring" },
  { id: "r-venator-ring", name: "Venator ring", slot: "ring", style: "ranged", bonuses: { rangedStrength: 12 }, gearProgressionId: "dt2-ring-ranged" },
  { id: "c-ava-assembler", name: "Ava's assembler", slot: "cape", style: "ranged", bonuses: { attackRanged: 0, rangedStrength: 4, defenceRanged: 6 }, notes: "Hard clue reward - not yet tracked in Gear Progression." },

  // ---------- MAGIC WEAPONS ----------
  { id: "w-master-wand", name: "Master wand (+ standard spellbook spell)", slot: "weapon", style: "magic", attackType: "magic", attackSpeed: 5, bonuses: { attackMagic: 26 }, alwaysAvailable: true },
  { id: "w-staff-of-the-dead", name: "Staff of the dead (+ standard spellbook spell)", slot: "weapon", style: "magic", attackType: "magic", attackSpeed: 5, bonuses: { attackMagic: 15, magicDamage: 15 }, gearProgressionId: "prb-magic-armor" },
  {
    id: "w-tumekens-shadow",
    name: "Tumeken's shadow",
    slot: "weapon",
    style: "magic",
    attackType: "magic",
    attackSpeed: 4,
    bonuses: { attackMagic: 60, magicDamage: 25 },
    gearProgressionId: "toa-magic-weapon",
    notes: "Triples (quadruples in ToA) your worn magic damage % - this calculator applies that multiplier automatically when Shadow is selected.",
  },

  { id: "a-mystic-robe-top", name: "Mystic robe top", slot: "body", style: "magic", bonuses: { defenceMagic: 16 }, alwaysAvailable: true },
  { id: "a-ancestral-hat", name: "Ancestral hat", slot: "head", style: "magic", bonuses: { defenceMagic: 15, magicDamage: 2 }, gearProgressionId: "cox-magic-armor" },
  { id: "a-ancestral-top", name: "Ancestral robe top", slot: "body", style: "magic", bonuses: { defenceMagic: 31, magicDamage: 2 }, gearProgressionId: "cox-magic-armor" },
  { id: "a-ancestral-bottom", name: "Ancestral robe bottom", slot: "legs", style: "magic", bonuses: { defenceMagic: 22, magicDamage: 2 }, gearProgressionId: "cox-magic-armor" },
  { id: "a-virtus-mask", name: "Virtus mask", slot: "head", style: "magic", bonuses: { defenceMagic: 12, magicDamage: 1 }, gearProgressionId: "dt2-magic-armor" },
  { id: "a-virtus-top", name: "Virtus robe top", slot: "body", style: "magic", bonuses: { defenceMagic: 26, magicDamage: 1 }, gearProgressionId: "dt2-magic-armor" },
  { id: "a-virtus-bottom", name: "Virtus robe legs", slot: "legs", style: "magic", bonuses: { defenceMagic: 20, magicDamage: 1 }, gearProgressionId: "dt2-magic-armor" },

  { id: "s-elidinis-ward", name: "Elidinis' ward", slot: "shield", style: "magic", bonuses: { defenceMagic: 32, magicDamage: 4 }, gearProgressionId: "toa-magic-shield" },
  { id: "n-occult-necklace", name: "Occult necklace", slot: "neck", style: "magic", bonuses: { magicDamage: 10 }, gearProgressionId: "fg-magic-neck" },
  { id: "g-tormented-bracelet", name: "Tormented bracelet", slot: "hands", style: "magic", bonuses: { defenceMagic: 12, magicDamage: 5 }, gearProgressionId: "prps-jewelry" },
  { id: "b-eternal-boots", name: "Eternal boots", slot: "feet", style: "magic", bonuses: { defenceMagic: 8, magicDamage: 2 }, notes: "From the Muspah - not yet tracked in Gear Progression." },
  { id: "r-magus-ring", name: "Magus ring", slot: "ring", style: "magic", bonuses: { magicDamage: 4 }, gearProgressionId: "dt2-ring-magic" },
  { id: "c-imbued-god-cape", name: "Imbued god cape", slot: "cape", style: "magic", bonuses: { defenceMagic: 6, magicDamage: 2.5 }, notes: "Mage Training Arena - not yet tracked in Gear Progression." },
];
