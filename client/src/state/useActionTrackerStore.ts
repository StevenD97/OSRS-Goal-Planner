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
        // Always re-resolve steps, even for an existing plan: gear/quest data can gain
        // more detail after a plan was first created, and step ids are deterministic
        // (quest:<id>, skill:<name>, gearItem:<id>, other:<slug>) so refreshing never
        // loses completion state - that's computed live or keyed by those stable ids.
        const steps = resolveActionPlan(item);

        if (existing) {
          set((state) => ({
            plans: state.plans.map((p) => (p.id === existing.id ? { ...p, steps } : p)),
          }));
          return existing.id;
        }

        const plan: ActionPlan = {
          id: crypto.randomUUID(),
          targetLabel: item.item,
          targetGearItemId: item.id,
          createdAt: Date.now(),
          steps,
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
