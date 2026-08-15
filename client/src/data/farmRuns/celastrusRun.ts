import type { FarmRunPreset } from "../../types/farming";

export const celastrusRun: FarmRunPreset = {
  id: "celastrus-run",
  name: "Celastrus Tree Run",
  shortName: "Celastrus",
  description:
    "A single high-level patch in the Farming Guild's northern area, used for battlestaff-crafting bark. Grow time is around 13-14 hours, so this is more of a 'check on your way past the Farming Guild' stop than a strict daily.",
  estimatedTime: "1-2 min",
  requirements: ["Level 85 Farming (also needed to enter the guild's northern area)"],
  loadout: [
    { item: "Spade" },
    { item: "Seed dibber" },
    { item: "Secateurs" },
    { item: "Compost / Ultracompost" },
    { item: "1x Celastrus seed" },
    { item: "8x Potato cactus", note: "payment to the farmer for protection" },
    { item: "Skills necklace or Farming cape", note: "teleport to the Farming Guild" },
  ],
  steps: [
    {
      id: "farming-guild-north",
      location: "Farming Guild - northern (85 Farming) area",
      actions: [
        "Teleport to the Farming Guild with a skills necklace or Farming cape.",
        "Head to the northern high-level area (requires 85 Farming to enter).",
        "Harvest the celastrus bark if fully grown, or clear a dead tree.",
        "Treat the soil with compost/ultracompost.",
        "Pay the farmer 8x potato cactus for protection.",
        "Plant a celastrus seed with the seed dibber.",
      ],
    },
  ],
  sourceUrl:
    "https://oldschool.runescape.wiki/w/Farming_runs#Tree,_fruit_tree,_calquat_tree,_and_celastrus_tree_run",
};
