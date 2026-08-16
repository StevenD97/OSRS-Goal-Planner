import type { Spell } from "../types/dpsCalculator";

/**
 * Standard spellbook combat spells have fixed, well-documented base max
 * hits. Powered staves (Trident, Sanguinesti staff, Tumeken's Shadow, etc.)
 * and Ancient Magicks scale differently (often with your Magic level) -
 * rather than risk a wrong scaling formula, use "Custom" and look up your
 * exact base max hit on the OSRS Wiki's "Maximum magic hit" page.
 */
export const SPELLS: Spell[] = [
  { id: "wind-strike", name: "Wind Strike", baseMaxHit: 2, level: 1 },
  { id: "water-strike", name: "Water Strike", baseMaxHit: 4, level: 5 },
  { id: "earth-strike", name: "Earth Strike", baseMaxHit: 6, level: 9 },
  { id: "fire-strike", name: "Fire Strike", baseMaxHit: 8, level: 13 },
  { id: "wind-bolt", name: "Wind Bolt", baseMaxHit: 9, level: 17 },
  { id: "water-bolt", name: "Water Bolt", baseMaxHit: 10, level: 23 },
  { id: "earth-bolt", name: "Earth Bolt", baseMaxHit: 11, level: 29 },
  { id: "fire-bolt", name: "Fire Bolt", baseMaxHit: 12, level: 35 },
  { id: "wind-blast", name: "Wind Blast", baseMaxHit: 13, level: 41 },
  { id: "water-blast", name: "Water Blast", baseMaxHit: 14, level: 47 },
  { id: "earth-blast", name: "Earth Blast", baseMaxHit: 15, level: 53 },
  { id: "fire-blast", name: "Fire Blast", baseMaxHit: 16, level: 59 },
  { id: "wind-wave", name: "Wind Wave", baseMaxHit: 17, level: 62 },
  { id: "water-wave", name: "Water Wave", baseMaxHit: 18, level: 65 },
  { id: "earth-wave", name: "Earth Wave", baseMaxHit: 19, level: 70 },
  { id: "fire-wave", name: "Fire Wave", baseMaxHit: 20, level: 75 },
  { id: "wind-surge", name: "Wind Surge", baseMaxHit: 21, level: 81 },
  { id: "water-surge", name: "Water Surge", baseMaxHit: 22, level: 85 },
  { id: "earth-surge", name: "Earth Surge", baseMaxHit: 23, level: 90 },
  { id: "fire-surge", name: "Fire Surge", baseMaxHit: 24, level: 95 },
  { id: "ice-barrage", name: "Ice Barrage (Ancient Magicks)", baseMaxHit: 30, level: 94 },
  { id: "custom", name: "Custom (powered staff / other spell)", baseMaxHit: 20, level: 1 },
];
