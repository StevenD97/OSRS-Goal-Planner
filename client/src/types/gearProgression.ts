export type CombatStyle = "melee" | "ranged" | "magic" | "shared";

export type GearSlot =
  | "head"
  | "cape"
  | "neck"
  | "weapon"
  | "shield"
  | "body"
  | "legs"
  | "hands"
  | "feet"
  | "ring"
  | "ammo"
  | "prayer";

export const STYLE_LABELS: Record<CombatStyle, string> = {
  melee: "Melee",
  ranged: "Ranged",
  magic: "Magic",
  shared: "Shared / Utility",
};

export const SLOT_LABELS: Record<GearSlot, string> = {
  head: "Head",
  cape: "Cape",
  neck: "Neck",
  weapon: "Weapon",
  shield: "Shield / Off-hand",
  body: "Body",
  legs: "Legs",
  hands: "Hands",
  feet: "Feet",
  ring: "Ring",
  ammo: "Ammo",
  prayer: "Prayer",
};

export interface GearProgressionItem {
  id: string;
  slot: GearSlot;
  item: string;
  style: CombatStyle;
  /** How an ironman actually obtains this - the important bit, since GE buying isn't an option. */
  source: string;
  requirements?: string;
  notes?: string;
}

export interface GearProgressionTier {
  id: string;
  order: number;
  name: string;
  description: string;
  items: GearProgressionItem[];
}
