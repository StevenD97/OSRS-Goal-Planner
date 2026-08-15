import type { GearProgressionItem } from "../types/gearProgression";
import type { PlanStep } from "../types/actionTracker";
import type { Quest } from "../data/quests";
import { QUESTS } from "../data/quests";
import type { GroupMember } from "../state/useAccountStore";
import { aggregateSkillLevel, isQuestCompletedByGroup } from "./groupAggregate";

function slugify(label: string): string {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 60);
}

/**
 * Recursively expands a gear item's requirements into an ordered,
 * deduplicated list of steps: prerequisite quests are resolved depth-first
 * (a quest's own prerequisites always appear before it), skill requirements
 * are merged to their highest required level, and the item itself is always
 * the final step. Quests without an entry in the QUESTS registry are still
 * added as a step - they just aren't expanded further (see data/quests.ts).
 */
export function resolveActionPlan(
  item: GearProgressionItem,
  quests: Record<string, Quest> = QUESTS,
): PlanStep[] {
  const raw: PlanStep[] = [];
  const visitedQuests = new Set<string>();
  const seenOther = new Set<string>();

  function pushSkill(skill: string, level: number) {
    raw.push({ id: `skill:${skill}`, kind: "skill", skill, level });
  }

  function pushOther(label: string) {
    const id = `other:${slugify(label)}`;
    if (seenOther.has(id)) return;
    seenOther.add(id);
    raw.push({ id, kind: "other", label });
  }

  function visitQuest(questId: string) {
    if (visitedQuests.has(questId)) return;
    visitedQuests.add(questId);
    const quest = quests[questId];
    if (quest?.requires) {
      for (const req of quest.requires) {
        if (req.type === "quest") visitQuest(req.questId);
      }
      for (const req of quest.requires) {
        if (req.type === "skill") pushSkill(req.skill, req.level);
        else if (req.type === "other") pushOther(req.label);
      }
    }
    raw.push({
      id: `quest:${questId}`,
      kind: "quest",
      questId,
      questName: quest?.name ?? questId,
    });
  }

  for (const req of item.requires ?? []) {
    if (req.type === "quest") visitQuest(req.questId);
    else if (req.type === "skill") pushSkill(req.skill, req.level);
    else pushOther(req.label);
  }

  raw.push({ id: `gearItem:${item.id}`, kind: "gearItem", gearItemId: item.id, itemName: item.item });

  // Merge skill mentions to the max required level, keeping the first-seen position.
  const skillMax = new Map<string, number>();
  for (const step of raw) {
    if (step.kind === "skill") {
      skillMax.set(step.skill, Math.max(skillMax.get(step.skill) ?? 0, step.level));
    }
  }
  const seenSkill = new Set<string>();
  const result: PlanStep[] = [];
  for (const step of raw) {
    if (step.kind === "skill") {
      if (seenSkill.has(step.skill)) continue;
      seenSkill.add(step.skill);
      result.push({ ...step, level: skillMax.get(step.skill)! });
    } else {
      result.push(step);
    }
  }
  return result;
}

/**
 * Whether a step is already satisfied. Quest/skill steps auto-resolve from
 * the group's synced Hiscores/WikiSync data (met by ANY member); gearItem
 * steps mirror the Gear Progression "obtained" checkbox; "other" steps and
 * anything not yet synced fall back to a manual checked-map.
 */
export function isStepComplete(
  step: PlanStep,
  members: GroupMember[],
  gearObtained: Record<string, boolean>,
  checked: Record<string, boolean>,
): boolean {
  if (step.kind === "gearItem") return !!gearObtained[step.gearItemId];
  if (checked[step.id]) return true;
  if (step.kind === "skill") return aggregateSkillLevel(members, step.skill) >= step.level;
  if (step.kind === "quest") return isQuestCompletedByGroup(members, step.questName);
  return false;
}
