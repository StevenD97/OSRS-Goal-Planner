export type HiscoresMode = "normal" | "ironman" | "hardcore" | "ultimate";

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
