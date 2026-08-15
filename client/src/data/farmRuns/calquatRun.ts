import type { FarmRunPreset } from "../../types/farming";

export const calquatRun: FarmRunPreset = {
  id: "calquat-run",
  name: "Calquat Tree Run",
  shortName: "Calquat",
  description:
    "A single, high-XP patch at Tai Bwo Wannai Village. Easy to tack onto the end of a tree/fruit tree run since it's just one stop.",
  estimatedTime: "1-2 min",
  requirements: [
    "Level 72 Farming",
    "Some Tai Bwo Wannai Village trading favour helps for shortcuts around the village",
  ],
  loadout: [
    { item: "Spade" },
    { item: "Seed dibber" },
    { item: "Secateurs" },
    { item: "Compost / Ultracompost" },
    { item: "1x Calquat tree seed" },
    { item: "Games necklace (Karamja) or Fairy ring / Karamja glider", note: "fastest ways into the Tai Bwo Wannai area" },
  ],
  steps: [
    {
      id: "tai-bwo-wannai",
      location: "Tai Bwo Wannai Village, Karamja",
      actions: [
        "Teleport to Karamja (games necklace, fairy ring, or glider) and head to Tai Bwo Wannai Village.",
        "Harvest the calquat fruit if the tree is fully grown, or clear a dead tree.",
        "Treat the soil with compost/ultracompost.",
        "Optionally pay the farmer for protection - ask them what they want, or check the wiki, since this can change.",
        "Plant a calquat tree seed with the seed dibber.",
      ],
    },
  ],
  sourceUrl:
    "https://oldschool.runescape.wiki/w/Farming_runs#Tree,_fruit_tree,_calquat_tree,_and_celastrus_tree_run",
};
