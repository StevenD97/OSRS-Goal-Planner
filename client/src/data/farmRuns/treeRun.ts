import type { FarmRunPreset } from "../../types/farming";

export const treeRun: FarmRunPreset = {
  id: "tree-run",
  name: "Tree Run",
  shortName: "Trees",
  description:
    "Loop of the six regular tree patches (oak/willow/maple/yew/magic). Big lump-sum Farming XP per harvest and one of the most efficient XP/minute daily routines in the game.",
  estimatedTime: "5-6 min",
  requirements: ["Level to match your chosen tree (15 oak, 30 willow, 45 maple, 60 yew, 75 magic)"],
  loadout: [
    { item: "Spade" },
    { item: "Seed dibber" },
    { item: "Secateurs", note: "magic secateurs give +10% yield" },
    { item: "Compost / Supercompost", note: "reduces disease chance" },
    { item: "Tree seeds", note: "6x of your chosen tree type, one per patch" },
    { item: "Ring of wealth", note: "teleport to Falador Park" },
    { item: "Varrock teleport (tab/staff/spell)" },
    { item: "Lumbridge teleport (tab/staff/spell/home teleport)" },
    { item: "Taverley teleport (tab) or house in Taverley", note: "or Trollheim teleport + walk" },
    { item: "Access to the Spirit tree network", note: "for the Gnome Stronghold patch" },
    { item: "Skills necklace or Farming cape", note: "for the Farming Guild patch (45+ Farming)" },
  ],
  steps: [
    {
      id: "falador",
      location: "Falador Park",
      actions: [
        "Teleport in with a ring of wealth (Falador option) - you land right next to the patch.",
        "Chop down/clear a dead tree if one is there, or check on your growing tree.",
        "If empty, treat the soil with compost and plant your tree seed with the seed dibber.",
        "If fully grown, chop it down for the lump-sum XP, then compost and replant.",
      ],
    },
    {
      id: "varrock",
      location: "Varrock Palace",
      actions: [
        "Teleport to Varrock and run north into the palace courtyard.",
        "Check on your tree - harvest and replant if fully grown, or plant fresh if the patch is empty.",
        "Compost the soil before planting.",
      ],
    },
    {
      id: "lumbridge",
      location: "Lumbridge",
      actions: [
        "Teleport to Lumbridge and run west through the castle grounds to the patch.",
        "Check on your tree - harvest and replant if fully grown, or plant fresh if the patch is empty.",
        "Compost the soil before planting.",
      ],
    },
    {
      id: "taverley",
      location: "Taverley",
      actions: [
        "Teleport to Taverley and run east to the patch.",
        "Check on your tree - harvest and replant if fully grown, or plant fresh if the patch is empty.",
        "Compost the soil before planting.",
      ],
    },
    {
      id: "gnome-stronghold",
      location: "Tree Gnome Stronghold",
      actions: [
        "Take the spirit tree network to Tree Gnome Stronghold and head southwest to the patch.",
        "Check on your tree - harvest and replant if fully grown, or plant fresh if the patch is empty.",
        "Compost the soil before planting.",
      ],
    },
    {
      id: "farming-guild",
      location: "Farming Guild",
      actions: [
        "Teleport in with a skills necklace or Farming cape (requires 45+ Farming to enter).",
        "Head to the tree patch inside the guild.",
        "Check on your tree - harvest and replant if fully grown, or plant fresh if the patch is empty.",
        "Compost the soil before planting.",
      ],
    },
  ],
  sourceUrl:
    "https://oldschool.runescape.wiki/w/Farming_runs#Tree,_fruit_tree,_calquat_tree,_and_celastrus_tree_run",
};
