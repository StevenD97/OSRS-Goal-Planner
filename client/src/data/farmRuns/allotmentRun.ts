import type { FarmRunPreset } from "../../types/farming";

export const allotmentRun: FarmRunPreset = {
  id: "allotment-run",
  name: "Allotment Run",
  shortName: "Allotments",
  description:
    "Vegetable patches at the same five locations as the herb run - easy to combine into one big loop. Good Farming XP and a steady supply of cooking ingredients.",
  estimatedTime: "5-10 min (add-on to the Herb Run)",
  requirements: ["Level to match your chosen vegetable (1 potato, 20 onion, 22 cabbage, 30 tomato, 47 sweetcorn...)"],
  loadout: [
    { item: "Rake" },
    { item: "Spade" },
    { item: "Seed dibber" },
    { item: "Compost / Supercompost" },
    { item: "Allotment seeds", note: "2x per location (each patch has 2 allotment plots)" },
    { item: "Matching protection flower already planted in the nearby flower patch", note: "e.g. marigolds protect most vegetables", optional: true },
    { item: "Same teleports as the Herb Run", note: "Falador, Ardougne, Morytania, Hosidius, Catherby" },
  ],
  steps: [
    {
      id: "falador",
      location: "Falador",
      actions: [
        "At the allotment plots next to the herb patch: harvest fully-grown crops or clear dead ones.",
        "Rake away weeds.",
        "Compost the soil.",
        "Plant your allotment seeds (2 plots).",
      ],
    },
    {
      id: "catherby",
      location: "Catherby",
      actions: [
        "Harvest fully-grown crops or clear dead ones.",
        "Rake away weeds.",
        "Compost the soil.",
        "Plant your allotment seeds (2 plots).",
      ],
    },
    {
      id: "ardougne",
      location: "Ardougne",
      actions: [
        "Harvest fully-grown crops or clear dead ones.",
        "Rake away weeds.",
        "Compost the soil.",
        "Plant your allotment seeds (2 plots).",
      ],
    },
    {
      id: "port-phasmatys",
      location: "Port Phasmatys (Morytania)",
      actions: [
        "Harvest fully-grown crops or clear dead ones.",
        "Rake away weeds.",
        "Compost the soil.",
        "Plant your allotment seeds (2 plots).",
      ],
    },
    {
      id: "hosidius",
      location: "Hosidius (Great Kourend)",
      actions: [
        "Harvest fully-grown crops or clear dead ones.",
        "Rake away weeds.",
        "Compost the soil.",
        "Plant your allotment seeds (2 plots).",
      ],
    },
  ],
  sourceUrl: "https://oldschool.runescape.wiki/w/Farming_runs",
};
