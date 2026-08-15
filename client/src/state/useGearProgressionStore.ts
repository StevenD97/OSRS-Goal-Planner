import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GearProgressionState {
  obtained: Record<string, boolean>;
  toggle: (itemId: string) => void;
}

export const useGearProgressionStore = create<GearProgressionState>()(
  persist(
    (set) => ({
      obtained: {},
      toggle: (itemId) =>
        set((state) => ({
          obtained: { ...state.obtained, [itemId]: !state.obtained[itemId] },
        })),
    }),
    { name: "osrs-goal-planner:gear-progression" },
  ),
);
