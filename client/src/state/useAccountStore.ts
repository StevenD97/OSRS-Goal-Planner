import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { HiscoresMode, HiscoresResult } from "../types/hiscores";
import type { WikiSyncNormalized } from "../types/wikisync";
import { fetchHiscores, fetchWikiSync, ApiError } from "../lib/api";
import { mapWikiSyncResponse } from "../lib/wikisyncMapper";

/**
 * A single linked account. For a solo account this is just one entry; for a
 * Group Ironman, each group member gets their own entry, and requirement
 * checks (see lib/groupAggregate.ts) are satisfied if ANY member meets them -
 * gear and unlocks are treated as pooled across the group, since that's how
 * GIM teams actually play. Quest/skill requirements are technically
 * per-character in the real game, but for planning purposes "has anyone in
 * the group done this" is the useful question.
 */
export interface GroupMember {
  rsn: string;
  mode: HiscoresMode;
  hiscores: HiscoresResult | null;
  wikisync: WikiSyncNormalized | null;
  hiscoresError: string | null;
  wikisyncError: string | null;
}

interface AccountState {
  members: GroupMember[];
  syncing: boolean;
  lastSyncedAt: number | null;

  addMember: (rsn: string, mode?: HiscoresMode) => void;
  /** Bulk add, e.g. from a pasted list - for uploading a whole GIM roster at once. */
  addMembers: (rsns: string[], mode?: HiscoresMode) => void;
  removeMember: (rsn: string) => void;
  setMemberMode: (rsn: string, mode: HiscoresMode) => void;
  syncAll: () => Promise<void>;
}

function newMember(rsn: string, mode: HiscoresMode = "normal"): GroupMember {
  return {
    rsn: rsn.trim(),
    mode,
    hiscores: null,
    wikisync: null,
    hiscoresError: null,
    wikisyncError: null,
  };
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      members: [],
      syncing: false,
      lastSyncedAt: null,

      addMember: (rsn, mode = "normal") => {
        const trimmed = rsn.trim();
        if (!trimmed) return;
        set((state) => {
          if (state.members.some((m) => m.rsn.toLowerCase() === trimmed.toLowerCase())) {
            return state;
          }
          return { members: [...state.members, newMember(trimmed, mode)] };
        });
      },

      addMembers: (rsns, mode = "normal") => {
        set((state) => {
          const existing = new Set(state.members.map((m) => m.rsn.toLowerCase()));
          const additions: GroupMember[] = [];
          for (const raw of rsns) {
            const trimmed = raw.trim();
            if (!trimmed) continue;
            const key = trimmed.toLowerCase();
            if (existing.has(key)) continue;
            existing.add(key);
            additions.push(newMember(trimmed, mode));
          }
          return additions.length ? { members: [...state.members, ...additions] } : state;
        });
      },

      removeMember: (rsn) => {
        set((state) => ({
          members: state.members.filter((m) => m.rsn.toLowerCase() !== rsn.toLowerCase()),
        }));
      },

      setMemberMode: (rsn, mode) => {
        set((state) => ({
          members: state.members.map((m) =>
            m.rsn.toLowerCase() === rsn.toLowerCase() ? { ...m, mode } : m,
          ),
        }));
      },

      syncAll: async () => {
        const { members } = get();
        if (members.length === 0) return;
        set({ syncing: true });

        const results = await Promise.all(
          members.map(async (member) => {
            const [hiscoresRes, wikisyncRes] = await Promise.allSettled([
              fetchHiscores(member.rsn, member.mode),
              fetchWikiSync(member.rsn),
            ]);

            return {
              ...member,
              hiscores: hiscoresRes.status === "fulfilled" ? hiscoresRes.value : member.hiscores,
              hiscoresError:
                hiscoresRes.status === "rejected"
                  ? hiscoresRes.reason instanceof ApiError
                    ? hiscoresRes.reason.message
                    : "Failed to fetch hiscores"
                  : null,
              wikisync:
                wikisyncRes.status === "fulfilled"
                  ? mapWikiSyncResponse(member.rsn, wikisyncRes.value)
                  : member.wikisync,
              wikisyncError:
                wikisyncRes.status === "rejected"
                  ? wikisyncRes.reason instanceof ApiError
                    ? wikisyncRes.reason.message
                    : "Failed to fetch WikiSync data"
                  : null,
            };
          }),
        );

        set({ members: results, syncing: false, lastSyncedAt: Date.now() });
      },
    }),
    { name: "osrs-goal-planner:account" },
  ),
);
