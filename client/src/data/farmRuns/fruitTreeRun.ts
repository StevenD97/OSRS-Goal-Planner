import type { FarmRunPreset } from "../../types/farming";

export const fruitTreeRun: FarmRunPreset = {
  id: "fruit-tree-run",
  name: "Fruit Tree Run",
  shortName: "Fruit Trees",
  description:
    "Loop of the five fruit tree patches. Slower growth than regular trees (multiple days), so this is more of a 'check every couple of days' run than a strict daily - but still worth folding into your routine.",
  estimatedTime: "6-8 min",
  requirements: [
    "Level to match your chosen fruit tree (e.g. 27 apple, 33 banana, 39 orange, 51 curry, 57 pineapple, 63 papaya, 68 palm)",
    "Mourning's End Part I for the Lletya patch",
  ],
  loadout: [
    { item: "Spade" },
    { item: "Seed dibber" },
    { item: "Secateurs", note: "magic secateurs give +10% yield" },
    { item: "Ultracompost", note: "gives near-total disease protection without needing to pay the farmer" },
    { item: "Fruit tree seeds", note: "5x of your chosen type, one per patch" },
    { item: "Fruit basket matching your tree", note: "only needed if not using ultracompost (pay the farmer for protection)", optional: true },
    { item: "Camelot teleport / fairy ring", note: "for Catherby" },
    { item: "Access to the Spirit tree network", note: "for Gnome Stronghold" },
    { item: "Brimhaven teleport tab, fairy ring, or Karamja glider", note: "for Brimhaven" },
    { item: "Crystal teleport seed / Lletya teleport / fairy ring", note: "for Lletya (needs Mourning's End Part I)" },
    { item: "Skills necklace or Farming cape", note: "for the Farming Guild patch" },
  ],
  steps: [
    {
      id: "catherby",
      location: "Catherby",
      actions: [
        "Teleport in (Camelot teleport, run east, or fairy ring) to the fruit tree patch.",
        "Harvest fruit if fully grown, or chop down a dead tree.",
        "Treat the soil with ultracompost, or pay the farmer with a basket of matching fruit for protection.",
        "Plant your fruit tree sapling/seed with the seed dibber.",
      ],
    },
    {
      id: "gnome-stronghold",
      location: "Tree Gnome Stronghold",
      actions: [
        "Take the spirit tree network to Tree Gnome Stronghold and head to the fruit tree patch.",
        "Harvest fruit if fully grown, or chop down a dead tree.",
        "Treat the soil with ultracompost, or pay the farmer for protection.",
        "Plant your fruit tree sapling/seed.",
      ],
    },
    {
      id: "brimhaven",
      location: "Brimhaven (Karamja)",
      actions: [
        "Teleport in with a Brimhaven teleport tab, fairy ring, or the Karamja glider.",
        "Harvest fruit if fully grown, or chop down a dead tree.",
        "Treat the soil with ultracompost, or pay the farmer for protection.",
        "Plant your fruit tree sapling/seed.",
      ],
    },
    {
      id: "lletya",
      location: "Lletya",
      actions: [
        "Teleport in with a crystal teleport seed, Lletya teleport, or fairy ring (requires Mourning's End Part I).",
        "Harvest fruit if fully grown, or chop down a dead tree.",
        "Treat the soil with ultracompost, or pay the farmer for protection.",
        "Plant your fruit tree sapling/seed.",
      ],
    },
    {
      id: "farming-guild",
      location: "Farming Guild",
      actions: [
        "Teleport in with a skills necklace or Farming cape.",
        "Head to the fruit tree patch inside the guild.",
        "Harvest fruit if fully grown, or chop down a dead tree.",
        "Treat the soil with ultracompost, or pay the farmer for protection.",
        "Plant your fruit tree sapling/seed.",
      ],
    },
  ],
  sourceUrl:
    "https://oldschool.runescape.wiki/w/Farming_runs#Tree,_fruit_tree,_calquat_tree,_and_celastrus_tree_run",
};
