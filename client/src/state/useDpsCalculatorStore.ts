import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CombatBonuses, CombatStyle, DpsSlot } from "../types/dpsCalculator";

interface Levels {
  attack: number;
  strength: number;
  defence: number;
  ranged: number;
  magic: number;
  hitpoints: number;
}

const DEFAULT_LEVELS: Levels = { attack: 99, strength: 99, defence: 99, ranged: 99, magic: 99, hitpoints: 99 };

interface DpsCalculatorState {
  style: CombatStyle;
  levels: Levels;
  prayerId: string;
  potionId: string;
  stance: "accurate" | "aggressive" | "controlled" | "defensive" | "rapid" | "longrange" | "standard";
  equipped: Record<CombatStyle, Partial<Record<DpsSlot, string>>>;
  spellId: string;
  targetId: string;
  customTarget: { hitpoints: number; defenceLevel: number; defenceStab: number; defenceSlash: number; defenceCrush: number; defenceMagic: number; defenceRanged: number };
  onSlayerTask: boolean;
  vsUndead: boolean;
  manualOverride: Partial<CombatBonuses> | null;

  setStyle: (style: CombatStyle) => void;
  setLevel: (key: keyof Levels, value: number) => void;
  setPrayerId: (id: string) => void;
  setPotionId: (id: string) => void;
  setStance: (stance: DpsCalculatorState["stance"]) => void;
  equipItem: (slot: DpsSlot, itemId: string | null) => void;
  applyLoadout: (style: CombatStyle, equipped: Partial<Record<DpsSlot, string>>) => void;
  setSpellId: (id: string) => void;
  setTargetId: (id: string) => void;
  setCustomTarget: (target: Partial<DpsCalculatorState["customTarget"]>) => void;
  setOnSlayerTask: (value: boolean) => void;
  setVsUndead: (value: boolean) => void;
  setManualOverride: (bonuses: Partial<CombatBonuses> | null) => void;
}

export const useDpsCalculatorStore = create<DpsCalculatorState>()(
  persist(
    (set) => ({
      style: "melee",
      levels: DEFAULT_LEVELS,
      prayerId: "none",
      potionId: "none",
      stance: "accurate",
      equipped: { melee: {}, ranged: {}, magic: {} },
      spellId: "fire-surge",
      targetId: "generic-slayer-mid",
      customTarget: { hitpoints: 100, defenceLevel: 50, defenceStab: 20, defenceSlash: 20, defenceCrush: 20, defenceMagic: 20, defenceRanged: 20 },
      onSlayerTask: false,
      vsUndead: false,
      manualOverride: null,

      setStyle: (style) => set({ style }),
      setLevel: (key, value) => set((state) => ({ levels: { ...state.levels, [key]: value } })),
      setPrayerId: (prayerId) => set({ prayerId }),
      setPotionId: (potionId) => set({ potionId }),
      setStance: (stance) => set({ stance }),
      equipItem: (slot, itemId) =>
        set((state) => {
          const forStyle = { ...state.equipped[state.style] };
          if (itemId) forStyle[slot] = itemId;
          else delete forStyle[slot];
          return { equipped: { ...state.equipped, [state.style]: forStyle } };
        }),
      applyLoadout: (style, equipped) =>
        set((state) => ({ equipped: { ...state.equipped, [style]: equipped } })),
      setSpellId: (spellId) => set({ spellId }),
      setTargetId: (targetId) => set({ targetId }),
      setCustomTarget: (target) => set((state) => ({ customTarget: { ...state.customTarget, ...target } })),
      setOnSlayerTask: (onSlayerTask) => set({ onSlayerTask }),
      setVsUndead: (vsUndead) => set({ vsUndead }),
      setManualOverride: (manualOverride) => set({ manualOverride }),
    }),
    { name: "osrs-goal-planner:dps-calculator" },
  ),
);
