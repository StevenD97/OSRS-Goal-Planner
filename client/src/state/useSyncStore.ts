import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateSyncCode, pushSnapshot, pullSnapshot, applySnapshot } from "../lib/cloudSync";

type SyncStatus = "idle" | "syncing" | "error";

interface SyncState {
  code: string | null;
  status: SyncStatus;
  lastSyncedAt: number | null;
  errorMessage: string | null;

  createCode: () => void;
  disconnect: () => void;
  syncNow: () => Promise<void>;
  restoreFromCode: (code: string) => Promise<boolean>;
}

export const useSyncStore = create<SyncState>()(
  persist(
    (set, get) => ({
      code: null,
      status: "idle",
      lastSyncedAt: null,
      errorMessage: null,

      createCode: () => {
        set({ code: generateSyncCode(), status: "idle", errorMessage: null, lastSyncedAt: null });
      },

      disconnect: () => {
        set({ code: null, status: "idle", lastSyncedAt: null, errorMessage: null });
      },

      syncNow: async () => {
        const { code } = get();
        if (!code) return;
        set({ status: "syncing", errorMessage: null });
        try {
          const { updatedAt } = await pushSnapshot(code);
          set({ status: "idle", lastSyncedAt: updatedAt });
        } catch (err) {
          set({ status: "error", errorMessage: err instanceof Error ? err.message : "Sync failed" });
        }
      },

      /** Pulls a code's saved snapshot and overwrites this device's local data - the
       * caller is expected to reload the page afterward so every store rehydrates. */
      restoreFromCode: async (rawCode) => {
        const code = rawCode.trim().toUpperCase();
        if (!code) return false;
        set({ status: "syncing", errorMessage: null });
        try {
          const result = await pullSnapshot(code);
          if (!result) {
            set({ status: "error", errorMessage: "No saved data found for that code." });
            return false;
          }
          applySnapshot(result.data);
          set({ code, status: "idle", lastSyncedAt: result.updatedAt, errorMessage: null });
          return true;
        } catch (err) {
          set({ status: "error", errorMessage: err instanceof Error ? err.message : "Restore failed" });
          return false;
        }
      },
    }),
    {
      name: "osrs-goal-planner:sync",
      partialize: (state) => ({ code: state.code, lastSyncedAt: state.lastSyncedAt }),
    },
  ),
);
