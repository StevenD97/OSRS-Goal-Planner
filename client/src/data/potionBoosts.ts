import type { PotionBoost } from "../types/dpsCalculator";

export const POTION_BOOSTS: PotionBoost[] = [
  { id: "none", name: "None", percent: 0, flat: 0 },
  { id: "super", name: "Super potion (Attack/Strength/Defence/Ranging/Magic)", percent: 15, flat: 5 },
  { id: "divine-super", name: "Divine super potion (same boost, doesn't decay)", percent: 15, flat: 5 },
  { id: "overload-nz", name: "Overload (Nightmare Zone) - all styles at once", percent: 15, flat: 5, allStats: true },
  { id: "overload-cox", name: "Overload (Chambers of Xeric) - all styles at once", percent: 13, flat: 5, allStats: true },
  { id: "overload-plus", name: "Overload (+) (Chambers of Xeric) - all styles at once", percent: 16, flat: 6, allStats: true },
];
