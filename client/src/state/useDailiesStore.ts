import { create } from "zustand";
import { persist } from "zustand/middleware";
import { osrsDayKey } from "../lib/dailyReset";
import type { DailyTask } from "../types/dailies";

interface DailiesState {
  dayKey: string;
  checkedIds: Record<string, boolean>;
  customTasks: DailyTask[];

  isChecked: (id: string) => boolean;
  toggle: (id: string) => void;
  addCustomTask: (label: string) => void;
  removeCustomTask: (id: string) => void;
}

function ensureFreshDay(state: DailiesState): Pick<DailiesState, "dayKey" | "checkedIds"> {
  const today = osrsDayKey();
  if (state.dayKey === today) return { dayKey: state.dayKey, checkedIds: state.checkedIds };
  return { dayKey: today, checkedIds: {} };
}

export const useDailiesStore = create<DailiesState>()(
  persist(
    (set, get) => ({
      dayKey: osrsDayKey(),
      checkedIds: {},
      customTasks: [],

      isChecked: (id) => {
        const fresh = ensureFreshDay(get());
        return !!fresh.checkedIds[id];
      },

      toggle: (id) => {
        set((state) => {
          const fresh = ensureFreshDay(state);
          return {
            ...fresh,
            checkedIds: { ...fresh.checkedIds, [id]: !fresh.checkedIds[id] },
          };
        });
      },

      addCustomTask: (label) => {
        const task: DailyTask = {
          id: `custom-${crypto.randomUUID()}`,
          label,
          category: "Misc",
        };
        set((state) => ({ customTasks: [...state.customTasks, task] }));
      },

      removeCustomTask: (id) => {
        set((state) => ({ customTasks: state.customTasks.filter((t) => t.id !== id) }));
      },
    }),
    { name: "osrs-goal-planner:dailies" },
  ),
);
