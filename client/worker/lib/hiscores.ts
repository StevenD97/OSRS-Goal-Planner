import { HISCORES_BASE, OUTBOUND_USER_AGENT } from "./config";

export type HiscoresMode = "normal" | "ironman" | "hardcore" | "ultimate";

const MODE_PATH: Record<HiscoresMode, string> = {
  normal: "hiscore_oldschool",
  ironman: "hiscore_oldschool_ironman",
  hardcore: "hiscore_oldschool_hardcore",
  ultimate: "hiscore_oldschool_ultimate",
};

// Stable, well-documented skill order used by the official OSRS hiscores
// "index_lite" endpoint. This list has not changed in years.
export const SKILL_ORDER = [
  "Overall",
  "Attack",
  "Defence",
  "Strength",
  "Hitpoints",
  "Ranged",
  "Prayer",
  "Magic",
  "Cooking",
  "Woodcutting",
  "Fletching",
  "Fishing",
  "Firemaking",
  "Crafting",
  "Smithing",
  "Mining",
  "Herblore",
  "Agility",
  "Thieving",
  "Slayer",
  "Farming",
  "Runecraft",
  "Hunter",
  "Construction",
] as const;

export interface SkillEntry {
  name: string;
  rank: number;
  level: number;
  xp: number;
}

export interface ActivityEntry {
  name: string;
  rank: number;
  score: number;
}

export interface HiscoresResult {
  username: string;
  mode: HiscoresMode;
  skills: SkillEntry[];
  activities: ActivityEntry[];
}

const ACTIVITY_NAMES: string[] = [
  "League Points",
  "Deadman Points",
  "Bounty Hunter - Hunter",
  "Bounty Hunter - Rogue",
  "Bounty Hunter (Legacy) - Hunter",
  "Bounty Hunter (Legacy) - Rogue",
  "Clue Scrolls (all)",
  "Clue Scrolls (beginner)",
  "Clue Scrolls (easy)",
  "Clue Scrolls (medium)",
  "Clue Scrolls (hard)",
  "Clue Scrolls (elite)",
  "Clue Scrolls (master)",
  "LMS - Rank",
  "PvP Arena - Rank",
  "Soul Wars Zeal",
  "Guardians of the Rift",
  "Colosseum Glory",
  "Collections Logged",
];

export class HiscoresNotFoundError extends Error {}

export async function fetchHiscores(
  username: string,
  mode: HiscoresMode = "normal",
): Promise<HiscoresResult> {
  const url = `${HISCORES_BASE}/m=${MODE_PATH[mode]}/index_lite.ws?player=${encodeURIComponent(username)}`;
  const res = await fetch(url, { headers: { "User-Agent": OUTBOUND_USER_AGENT } });

  if (res.status === 404) {
    throw new HiscoresNotFoundError(`No hiscores entry for "${username}"`);
  }
  if (!res.ok) {
    throw new Error(`Hiscores request failed with status ${res.status}`);
  }

  const csv = await res.text();
  const lines = csv.trim().split("\n").map((l) => l.trim()).filter(Boolean);

  const skills: SkillEntry[] = SKILL_ORDER.map((name, i) => {
    const [rank, level, xp] = (lines[i] ?? "-1,-1,-1").split(",").map(Number);
    return { name, rank, level, xp };
  });

  const activities: ActivityEntry[] = lines.slice(SKILL_ORDER.length).map((line, i) => {
    const [rank, score] = line.split(",").map(Number);
    return { name: ACTIVITY_NAMES[i] ?? `Activity ${i}`, rank, score };
  });

  return { username, mode, skills, activities };
}
