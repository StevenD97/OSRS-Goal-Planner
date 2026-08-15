import type { FarmRunPreset } from "../../types/farming";

export const hardwoodRun: FarmRunPreset = {
  id: "hardwood-run",
  name: "Hardwood Tree Run",
  shortName: "Hardwood",
  description:
    "The three hardwood patches in the Mushroom Forest on Fossil Island, used to grow teak and mahogany trees. Slow growth (over a day), so treat this as a check-in every day or two rather than a strict daily.",
  estimatedTime: "3-5 min",
  requirements: [
    "Level 35 Farming for teak, 55 Farming for mahogany",
    "Bone Voyage (quest) recommended for fast access to Fossil Island",
  ],
  loadout: [
    { item: "Spade" },
    { item: "Seed dibber" },
    { item: "Secateurs" },
    { item: "Compost / Ultracompost" },
    { item: "Teak and/or mahogany seeds", note: "one per patch, 3 total" },
    { item: "Protection payment", note: "ask the on-site farmer what they want, or check the wiki - varies and can change", optional: true },
    { item: "Digsite pendant or House teleport to a Fossil Island POH", note: "fast ways to reach Fossil Island" },
  ],
  steps: [
    {
      id: "fossil-island-arrival",
      location: "Fossil Island - Mushroom Forest",
      actions: [
        "Travel to Fossil Island (Digsite pendant, boat from the Digsite, or house teleport if your POH is on the island).",
        "Head to the Mushroom Forest area where the three hardwood patches are.",
      ],
    },
    {
      id: "hardwood-patch-1",
      location: "Hardwood patch 1",
      actions: [
        "Harvest logs if fully grown, or clear a dead tree.",
        "Treat the soil with compost/ultracompost.",
        "Pay for protection if desired.",
        "Plant a teak or mahogany seed.",
      ],
    },
    {
      id: "hardwood-patch-2",
      location: "Hardwood patch 2",
      actions: [
        "Harvest logs if fully grown, or clear a dead tree.",
        "Treat the soil with compost/ultracompost.",
        "Pay for protection if desired.",
        "Plant a teak or mahogany seed.",
      ],
    },
    {
      id: "hardwood-patch-3",
      location: "Hardwood patch 3",
      actions: [
        "Harvest logs if fully grown, or clear a dead tree.",
        "Treat the soil with compost/ultracompost.",
        "Pay for protection if desired.",
        "Plant a teak or mahogany seed.",
      ],
    },
  ],
  sourceUrl: "https://oldschool.runescape.wiki/w/Farming_runs",
};
