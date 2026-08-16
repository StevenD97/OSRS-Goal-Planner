/**
 * Skills in the exact order they appear in the in-game skills panel
 * (the 3-column grid, read row by row) - distinct from data/skills.ts,
 * which lists them in Hiscores API order.
 */
export const SKILL_BAR_ORDER = [
  "Attack",
  "Hitpoints",
  "Mining",
  "Strength",
  "Agility",
  "Smithing",
  "Defence",
  "Herblore",
  "Fishing",
  "Ranged",
  "Thieving",
  "Cooking",
  "Prayer",
  "Crafting",
  "Firemaking",
  "Magic",
  "Fletching",
  "Woodcutting",
  "Runecraft",
  "Slayer",
  "Farming",
  "Construction",
  "Hunter",
] as const;
