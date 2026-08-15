import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Goal, GoalSource, GoalCategory } from "../types/goals";

interface GoalsState {
  goals: Goal[];
  addGoal: (params: { title: string; category: GoalCategory; source: GoalSource; notes?: string }) => void;
  removeGoal: (id: string) => void;
  setManualCompleted: (id: string, completed: boolean) => void;
}

export const useGoalsStore = create<GoalsState>()(
  persist(
    (set) => ({
      goals: [],

      addGoal: ({ title, category, source, notes }) => {
        const goal: Goal = {
          id: crypto.randomUUID(),
          title,
          category,
          source,
          manualCompleted: false,
          createdAt: Date.now(),
          notes,
        };
        set((state) => ({ goals: [goal, ...state.goals] }));
      },

      removeGoal: (id) => {
        set((state) => ({ goals: state.goals.filter((g) => g.id !== id) }));
      },

      setManualCompleted: (id, completed) => {
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, manualCompleted: completed } : g)),
        }));
      },
    }),
    { name: "osrs-goal-planner:goals" },
  ),
);
