import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ActionPlan } from "../types/actionTracker";
import type { GearProgressionItem } from "../types/gearProgression";
import { resolveActionPlan } from "../lib/actionPlan";

interface ActionTrackerState {
  plans: ActionPlan[];
  /** Manual confirmation for quest/skill/other steps, keyed by step id - a fallback for
   * whatever isn't (yet) covered by synced Hiscores/WikiSync data. */
  checked: Record<string, boolean>;

  addPlan: (item: GearProgressionItem) => string;
  removePlan: (planId: string) => void;
  toggleChecked: (stepId: string) => void;
  hasPlanForItem: (gearItemId: string) => boolean;
}

export const useActionTrackerStore = create<ActionTrackerState>()(
  persist(
    (set, get) => ({
      plans: [],
      checked: {},

      addPlan: (item) => {
        const existing = get().plans.find((p) => p.targetGearItemId === item.id);
        if (existing) return existing.id;

        const plan: ActionPlan = {
          id: crypto.randomUUID(),
          targetLabel: item.item,
          targetGearItemId: item.id,
          createdAt: Date.now(),
          steps: resolveActionPlan(item),
        };
        set((state) => ({ plans: [plan, ...state.plans] }));
        return plan.id;
      },

      removePlan: (planId) => {
        set((state) => ({ plans: state.plans.filter((p) => p.id !== planId) }));
      },

      toggleChecked: (stepId) => {
        set((state) => ({ checked: { ...state.checked, [stepId]: !state.checked[stepId] } }));
      },

      hasPlanForItem: (gearItemId) => get().plans.some((p) => p.targetGearItemId === gearItemId),
    }),
    { name: "osrs-goal-planner:action-tracker" },
  ),
);
