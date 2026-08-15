import type { FarmRunPreset } from "../../types/farming";
import { herbRun } from "./herbRun";
import { treeRun } from "./treeRun";
import { fruitTreeRun } from "./fruitTreeRun";
import { calquatRun } from "./calquatRun";
import { celastrusRun } from "./celastrusRun";
import { hardwoodRun } from "./hardwoodRun";
import { allotmentRun } from "./allotmentRun";
import { flowerRun } from "./flowerRun";

export const FARM_RUNS: FarmRunPreset[] = [
  herbRun,
  treeRun,
  fruitTreeRun,
  calquatRun,
  celastrusRun,
  allotmentRun,
  flowerRun,
  hardwoodRun,
];

export const FARM_RUNS_BY_ID: Record<string, FarmRunPreset> = Object.fromEntries(
  FARM_RUNS.map((run) => [run.id, run]),
);

export {
  herbRun,
  treeRun,
  fruitTreeRun,
  calquatRun,
  celastrusRun,
  hardwoodRun,
  allotmentRun,
  flowerRun,
};
