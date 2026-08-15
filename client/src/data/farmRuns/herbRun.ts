import type { FarmRunPreset } from "../../types/farming";

export const herbRun: FarmRunPreset = {
  id: "herb-run",
  name: "Herb Run",
  shortName: "Herbs",
  description:
    "Quick daily loop of the five main herb patches. Great Herblore XP and a steady supply of grimy herbs for potions or the Grand Exchange.",
  estimatedTime: "5-10 min",
  requirements: ["Level to match your chosen herb (e.g. 32 for Ranarr, 62 for Snapdragon, 85 for Torstol)"],
  loadout: [
    { item: "Rake", note: "clears weeds" },
    { item: "Spade" },
    { item: "Seed dibber" },
    { item: "Secateurs", note: "magic secateurs give +10% yield" },
    { item: "Compost / Supercompost / Ultracompost", note: "ultracompost gives the best disease protection" },
    { item: "Herb seeds", note: "5-6x of your chosen herb, one per patch" },
    { item: "Farmer's strawhat / outfit pieces", note: "chance to auto-weed and save seeds", optional: true },
    { item: "Explorer's ring (2/3/4)", note: "teleport to Falador patch" },
    { item: "Ardougne cloak (2/3/4)", note: "teleport to Ardougne patch" },
    { item: "Ectophial", note: "teleport near the Port Phasmatys / Morytania patch" },
    { item: "Xeric's talisman", note: "teleport to Xeric's Glade, near the Hosidius patch" },
    { item: "Camelot teleport (tab/spell) or Fairy ring", note: "for the Catherby patch" },
    { item: "Skills necklace or Farming cape", note: "for the optional Farming Guild patch (45+ Farming)", optional: true },
  ],
  steps: [
    {
      id: "falador",
      location: "Falador",
      actions: [
        "Teleport in with Explorer's ring (or Falador teleport) - patch is just south of West Falador farm.",
        "Harvest any fully-grown herbs, or clear the patch if the crop died.",
        "Rake away weeds if present.",
        "Treat the soil with compost/supercompost/ultracompost.",
        "Plant your herb seed with the seed dibber.",
      ],
    },
    {
      id: "catherby",
      location: "Catherby",
      actions: [
        "Teleport with a Camelot teleport (run east) or fairy ring, then head to the farming patch north of the bank.",
        "Harvest any fully-grown herbs, or clear the patch if the crop died.",
        "Rake away weeds if present.",
        "Treat the soil with compost/supercompost/ultracompost.",
        "Plant your herb seed with the seed dibber.",
      ],
    },
    {
      id: "ardougne",
      location: "Ardougne",
      actions: [
        "Teleport directly to the patch with an Ardougne cloak (2/3/4), just north of Ardougne.",
        "Harvest any fully-grown herbs, or clear the patch if the crop died.",
        "Rake away weeds if present.",
        "Treat the soil with compost/supercompost/ultracompost.",
        "Plant your herb seed with the seed dibber.",
      ],
    },
    {
      id: "port-phasmatys",
      location: "Port Phasmatys (Morytania)",
      actions: [
        "Use the Ectophial to teleport to the Ectofuntus, then head to the nearby farming patch.",
        "Harvest any fully-grown herbs, or clear the patch if the crop died.",
        "Rake away weeds if present.",
        "Treat the soil with compost/supercompost/ultracompost.",
        "Plant your herb seed with the seed dibber.",
      ],
    },
    {
      id: "hosidius",
      location: "Hosidius (Great Kourend)",
      actions: [
        "Teleport to Xeric's Glade with a Xeric's talisman, then head to the Hosidius farming patch.",
        "Harvest any fully-grown herbs, or clear the patch if the crop died.",
        "Rake away weeds if present.",
        "Treat the soil with compost/supercompost/ultracompost.",
        "Plant your herb seed with the seed dibber.",
      ],
    },
    {
      id: "farming-guild",
      location: "Farming Guild (optional, 45+ Farming)",
      actions: [
        "Teleport in with a skills necklace or Farming cape.",
        "Head to the herb patch (gives a small yield boost inside the guild).",
        "Harvest, clear weeds, compost, and plant as usual.",
      ],
    },
  ],
  sourceUrl: "https://oldschool.runescape.wiki/w/Farming_runs",
};
