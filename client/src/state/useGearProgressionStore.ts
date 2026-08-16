import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GearProgressionState {
  /** Whether the item is obtained at all (by you, or - via the Group dashboard - by anyone in the group). Derived from counts, kept in sync. */
  obtained: Record<string, boolean>;
  /** How many copies of the item currently exist across the linked Group Ironman roster. */
  counts: Record<string, number>;

  /** Simple on/off toggle for the individual Gear Progression checklist - flips between 0 and 1. */
  toggle: (itemId: string) => void;
  /** Set an exact count for the Group dashboard's Gear tab. */
  setCount: (itemId: string, count: number) => void;
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
}

function withCount(
  state: Pick<GearProgressionState, "obtained" | "counts">,
  itemId: string,
  count: number,
): Pick<GearProgressionState, "obtained" | "counts"> {
  const clamped = Math.max(0, count);
  return {
    counts: { ...state.counts, [itemId]: clamped },
    obtained: { ...state.obtained, [itemId]: clamped > 0 },
  };
}

export const useGearProgressionStore = create<GearProgressionState>()(
  persist(
    (set, get) => ({
      obtained: {},
      counts: {},

      toggle: (itemId) => {
        const current = get().counts[itemId] ?? 0;
        set((state) => withCount(state, itemId, current > 0 ? 0 : 1));
      },

      setCount: (itemId, count) => set((state) => withCount(state, itemId, count)),

      increment: (itemId) => {
        const current = get().counts[itemId] ?? 0;
        set((state) => withCount(state, itemId, current + 1));
      },

      decrement: (itemId) => {
        const current = get().counts[itemId] ?? 0;
        set((state) => withCount(state, itemId, current - 1));
      },
    }),
    { name: "osrs-goal-planner:gear-progression" },
  ),
);
