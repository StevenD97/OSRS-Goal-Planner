import type { Prayer } from "../types/dpsCalculator";

export const PRAYERS: Prayer[] = [
  { id: "none", name: "None", style: "melee", attackPercent: 0, strengthPercent: 0, defencePercent: 0, level: 1 },

  // Melee
  { id: "clarity", name: "Clarity of Thought", style: "melee", attackPercent: 5, strengthPercent: 0, defencePercent: 0, level: 4 },
  { id: "burst", name: "Burst of Strength", style: "melee", attackPercent: 0, strengthPercent: 5, defencePercent: 0, level: 4 },
  { id: "improved-reflexes", name: "Improved Reflexes", style: "melee", attackPercent: 10, strengthPercent: 0, defencePercent: 0, level: 16 },
  { id: "superhuman-strength", name: "Superhuman Strength", style: "melee", attackPercent: 0, strengthPercent: 10, defencePercent: 0, level: 16 },
  { id: "incredible-reflexes", name: "Incredible Reflexes", style: "melee", attackPercent: 15, strengthPercent: 0, defencePercent: 0, level: 34 },
  { id: "ultimate-strength", name: "Ultimate Strength", style: "melee", attackPercent: 0, strengthPercent: 15, defencePercent: 0, level: 31 },
  { id: "chivalry", name: "Chivalry", style: "melee", attackPercent: 15, strengthPercent: 18, defencePercent: 20, level: 60 },
  { id: "piety", name: "Piety", style: "melee", attackPercent: 20, strengthPercent: 23, defencePercent: 25, level: 70 },

  // Ranged
  { id: "sharp-eye", name: "Sharp Eye", style: "ranged", attackPercent: 5, strengthPercent: 5, defencePercent: 0, level: 8 },
  { id: "hawk-eye", name: "Hawk Eye", style: "ranged", attackPercent: 10, strengthPercent: 10, defencePercent: 0, level: 26 },
  { id: "eagle-eye", name: "Eagle Eye", style: "ranged", attackPercent: 15, strengthPercent: 15, defencePercent: 0, level: 44 },
  { id: "rigour", name: "Rigour", style: "ranged", attackPercent: 20, strengthPercent: 23, defencePercent: 25, level: 74 },

  // Magic
  { id: "mystic-will", name: "Mystic Will", style: "magic", attackPercent: 5, strengthPercent: 0, defencePercent: 0, level: 9 },
  { id: "mystic-lore", name: "Mystic Lore", style: "magic", attackPercent: 10, strengthPercent: 0, defencePercent: 0, level: 27 },
  { id: "mystic-might", name: "Mystic Might", style: "magic", attackPercent: 15, strengthPercent: 0, defencePercent: 0, level: 45 },
  { id: "augury", name: "Augury", style: "magic", attackPercent: 25, strengthPercent: 0, defencePercent: 25, level: 77 },
];
