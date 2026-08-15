import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HiscoresMode, HiscoresResult } from "../types/hiscores";
import type { WikiSyncNormalized } from "../types/wikisync";
import { fetchHiscores, fetchWikiSync, ApiError } from "../lib/api";
import { mapWikiSyncResponse } from "../lib/wikisyncMapper";

interface AccountState {
  rsn: string;
  mode: HiscoresMode;
  hiscores: HiscoresResult | null;
  wikisync: WikiSyncNormalized | null;
  wikisyncError: string | null;
  hiscoresError: string | null;
  syncing: boolean;
  lastSyncedAt: number | null;

  setRsn: (rsn: string) => void;
  setMode: (mode: HiscoresMode) => void;
  sync: () => Promise<void>;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      rsn: "",
      mode: "normal",
      hiscores: null,
      wikisync: null,
      wikisyncError: null,
      hiscoresError: null,
      syncing: false,
      lastSyncedAt: null,

      setRsn: (rsn) => set({ rsn }),
      setMode: (mode) => set({ mode }),

      sync: async () => {
        const { rsn, mode } = get();
        if (!rsn.trim()) return;
        set({ syncing: true, hiscoresError: null, wikisyncError: null });

        const [hiscoresRes, wikisyncRes] = await Promise.allSettled([
          fetchHiscores(rsn, mode),
          fetchWikiSync(rsn),
        ]);

        set({
          hiscores: hiscoresRes.status === "fulfilled" ? hiscoresRes.value : get().hiscores,
          hiscoresError:
            hiscoresRes.status === "rejected"
              ? hiscoresRes.reason instanceof ApiError
                ? hiscoresRes.reason.message
                : "Failed to fetch hiscores"
              : null,
          wikisync:
            wikisyncRes.status === "fulfilled"
              ? mapWikiSyncResponse(rsn, wikisyncRes.value)
              : get().wikisync,
          wikisyncError:
            wikisyncRes.status === "rejected"
              ? wikisyncRes.reason instanceof ApiError
                ? wikisyncRes.reason.message
                : "Failed to fetch WikiSync data"
              : null,
          syncing: false,
          lastSyncedAt: Date.now(),
        });
      },
    }),
    { name: "osrs-goal-planner:account" },
  ),
);
