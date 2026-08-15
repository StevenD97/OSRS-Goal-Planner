import type { GroupMember } from "../state/useAccountStore";
import type { WikiSyncCategory, WikiSyncItem } from "../types/wikisync";

/**
 * A requirement is "met for the group" if any single member meets it -
 * gear, unlocks, and resources are treated as pooled/tradeable across a
 * Group Ironman team, even though quests and skill levels are technically
 * per-character in-game.
 */

export function aggregateSkillLevel(members: GroupMember[], skill: string): number {
  let max = -1;
  for (const m of members) {
    const entry = m.hiscores?.skills.find((s) => s.name === skill);
    if (entry && entry.level > max) max = entry.level;
  }
  return max;
}

export function aggregateActivityScore(members: GroupMember[], activity: string): number {
  let max = -1;
  for (const m of members) {
    const entry = m.hiscores?.activities.find((a) => a.name === activity);
    if (entry && entry.score > max) max = entry.score;
  }
  return max;
}

export function isQuestCompletedByGroup(members: GroupMember[], questName: string): boolean {
  return members.some((m) =>
    m.wikisync?.categories.quests?.some(
      (i) => i.name.toLowerCase() === questName.toLowerCase() && i.completed,
    ),
  );
}

export function isWikiSyncItemCompletedByGroup(
  members: GroupMember[],
  category: WikiSyncCategory,
  itemId: string,
): boolean {
  return members.some((m) => m.wikisync?.categories[category]?.some((i) => i.id === itemId && i.completed));
}

/** Union of a WikiSync category across the group, for populating pickers - completed if any member has it. */
export function aggregateWikiSyncCategory(
  members: GroupMember[],
  category: WikiSyncCategory,
): WikiSyncItem[] {
  const map = new Map<string, WikiSyncItem>();
  for (const member of members) {
    for (const item of member.wikisync?.categories[category] ?? []) {
      const existing = map.get(item.id);
      if (!existing || (item.completed && !existing.completed)) {
        map.set(item.id, existing ? { ...existing, completed: true } : { ...item });
      }
    }
  }
  return Array.from(map.values());
}

export function anyMemberSynced(members: GroupMember[]): boolean {
  return members.some((m) => m.hiscores || m.wikisync);
}
