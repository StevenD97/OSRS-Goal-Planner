import { create } from "zustand";
import { persist } from "zustand/middleware";
import { osrsDayKey } from "../lib/dailyReset";

interface RunProgress {
  dayKey: string;
  checkedStepIds: Record<string, boolean>;
}

// Stable reference so the "no progress yet" case doesn't return a fresh
// object identity on every selector call (that would trip an infinite
// render loop with zustand's useSyncExternalStore-based subscriptions).
const EMPTY_CHECKED: Record<string, boolean> = {};

interface FarmRunState {
  progress: Record<string, RunProgress>;
  toggleStep: (runId: string, stepId: string) => void;
  resetRun: (runId: string) => void;
  /** Returns the checked-step map for a run, auto-resetting if it's a new OSRS day. */
  getChecked: (runId: string) => Record<string, boolean>;
}

export const useFarmRunStore = create<FarmRunState>()(
  persist(
    (set, get) => ({
      progress: {},

      getChecked: (runId) => {
        const entry = get().progress[runId];
        if (!entry || entry.dayKey !== osrsDayKey()) return EMPTY_CHECKED;
        return entry.checkedStepIds;
      },

      toggleStep: (runId, stepId) => {
        const today = osrsDayKey();
        set((state) => {
          const existing = state.progress[runId];
          const current =
            existing && existing.dayKey === today ? existing.checkedStepIds : {};
          return {
            progress: {
              ...state.progress,
              [runId]: {
                dayKey: today,
                checkedStepIds: { ...current, [stepId]: !current[stepId] },
              },
            },
          };
        });
      },

      resetRun: (runId) => {
        set((state) => ({
          progress: {
            ...state.progress,
            [runId]: { dayKey: osrsDayKey(), checkedStepIds: {} },
          },
        }));
      },
    }),
    { name: "osrs-goal-planner:farm-runs" },
  ),
);
