import type { FarmRunPreset } from "../../types/farming";

export const flowerRun: FarmRunPreset = {
  id: "flower-run",
  name: "Flower Run",
  shortName: "Flowers",
  description:
    "The single flower patch at each of the five main farm locations. Flowers give a little Farming XP themselves, and the right flower planted here protects the nearby allotment from disease.",
  estimatedTime: "3-5 min (add-on to the Herb/Allotment Run)",
  requirements: ["Level to match your chosen flower (0 marigold, 11 rosemary, 24 nasturtium...)"],
  loadout: [
    { item: "Rake" },
    { item: "Spade" },
    { item: "Seed dibber" },
    { item: "Compost" },
    { item: "Flower seeds", note: "1x per location - pick the type that protects your allotment crop (e.g. marigolds for most vegetables, nasturtiums for watermelons/strawberries)" },
    { item: "Same teleports as the Herb Run", note: "Falador, Ardougne, Morytania, Hosidius, Catherby" },
  ],
  steps: [
    {
      id: "falador",
      location: "Falador",
      actions: [
        "Harvest or clear the flower patch.",
        "Compost the soil.",
        "Plant a flower seed that matches the protection your allotment crop needs.",
      ],
    },
    {
      id: "catherby",
      location: "Catherby",
      actions: [
        "Harvest or clear the flower patch.",
        "Compost the soil.",
        "Plant a flower seed that matches the protection your allotment crop needs.",
      ],
    },
    {
      id: "ardougne",
      location: "Ardougne",
      actions: [
        "Harvest or clear the flower patch.",
        "Compost the soil.",
        "Plant a flower seed that matches the protection your allotment crop needs.",
      ],
    },
    {
      id: "port-phasmatys",
      location: "Port Phasmatys (Morytania)",
      actions: [
        "Harvest or clear the flower patch.",
        "Compost the soil.",
        "Plant a flower seed that matches the protection your allotment crop needs.",
      ],
    },
    {
      id: "hosidius",
      location: "Hosidius (Great Kourend)",
      actions: [
        "Harvest or clear the flower patch.",
        "Compost the soil.",
        "Plant a flower seed that matches the protection your allotment crop needs.",
      ],
    },
  ],
  sourceUrl: "https://oldschool.runescape.wiki/w/Farming_runs",
};
