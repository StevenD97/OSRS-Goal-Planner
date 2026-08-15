import type { DailyTask } from "../types/dailies";
import { FARM_RUNS } from "./farmRuns";

const farmingTasks: DailyTask[] = FARM_RUNS.map((run) => ({
  id: `farm-${run.id}`,
  label: run.name,
  category: "Farming",
  notes: run.estimatedTime,
  farmRunId: run.id,
}));

const resourceRunTasks: DailyTask[] = [
  {
    id: "miscellania",
    label: "Collect resources from Managing Miscellania",
    category: "Resource Runs",
    notes: "Requires Throne of Miscellania / Royal Trouble and a decent approval rating.",
  },
  {
    id: "bert-sand",
    label: "Collect free sand from Bert (Yanille)",
    category: "Resource Runs",
    notes: "Requires The Hand in the Sand.",
  },
  {
    id: "wyson-seaweed",
    label: "Collect free giant seaweed from Wyson the gardener",
    category: "Resource Runs",
    notes: "Found near the West Falador farm, by the tree patch.",
  },
  {
    id: "amylase-pack",
    label: "Grab a daily amylase pack from Poison Waste",
    category: "Resource Runs",
    notes: "Kandarin, near Ardougne - small XP boost to several skills.",
  },
];

const miscTasks: DailyTask[] = [
  { id: "ge-offers", label: "Check / refresh Grand Exchange offers", category: "Misc" },
  { id: "restock-supplies", label: "Restock potions and consumables", category: "Misc" },
];

export const DAILY_TASKS: DailyTask[] = [...farmingTasks, ...resourceRunTasks, ...miscTasks];
