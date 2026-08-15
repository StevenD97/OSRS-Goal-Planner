import { useMemo, useState } from "react";
import { SKILLS } from "../../data/skills";
import { useAccountStore } from "../../state/useAccountStore";
import { useGoalsStore } from "../../state/useGoalsStore";
import { aggregateWikiSyncCategory } from "../../lib/groupAggregate";
import type { GoalCategory } from "../../types/goals";
import type { WikiSyncCategory } from "../../types/wikisync";

const WIKISYNC_CATEGORY_OPTIONS: { value: WikiSyncCategory; label: string; category: GoalCategory }[] = [
  { value: "quests", label: "Quests", category: "quest" },
  { value: "achievementDiaries", label: "Achievement Diaries", category: "diary" },
  { value: "combatAchievements", label: "Combat Achievements", category: "combatAchievement" },
  { value: "collectionLog", label: "Collection Log", category: "collectionLog" },
];

type GoalKind = "skill" | "wikisync" | "activity" | "custom";

export function AddGoalForm() {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState<GoalKind>("skill");
  const addGoal = useGoalsStore((s) => s.addGoal);
  const members = useAccountStore((s) => s.members);

  const [skill, setSkill] = useState<string>(SKILLS[0]);
  const [targetLevel, setTargetLevel] = useState(99);

  const [activityName, setActivityName] = useState("");
  const [targetScore, setTargetScore] = useState(1);

  const [wikisyncCategory, setWikisyncCategory] = useState<WikiSyncCategory>("quests");
  const [wikisyncItemId, setWikisyncItemId] = useState("");

  const [customTitle, setCustomTitle] = useState("");

  const wikisyncItems = useMemo(
    () => aggregateWikiSyncCategory(members, wikisyncCategory),
    [members, wikisyncCategory],
  );

  function reset() {
    setSkill(SKILLS[0]);
    setTargetLevel(99);
    setActivityName("");
    setTargetScore(1);
    setWikisyncItemId("");
    setCustomTitle("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (kind === "skill") {
      addGoal({
        title: `${skill} level ${targetLevel}`,
        category: "skill",
        source: { type: "skill", skill, targetLevel },
      });
    } else if (kind === "activity") {
      if (!activityName.trim()) return;
      addGoal({
        title: `${activityName} x${targetScore}`,
        category: "boss",
        source: { type: "activity", activity: activityName.trim(), targetScore },
      });
    } else if (kind === "wikisync") {
      const item = wikisyncItems.find((i) => i.id === wikisyncItemId);
      if (!item) return;
      const categoryMeta = WIKISYNC_CATEGORY_OPTIONS.find((c) => c.value === wikisyncCategory)!;
      addGoal({
        title: item.name,
        category: categoryMeta.category,
        source: {
          type: "wikisync",
          category: wikisyncCategory,
          itemId: item.id,
          itemName: item.name,
        },
      });
    } else {
      if (!customTitle.trim()) return;
      addGoal({ title: customTitle.trim(), category: "custom", source: { type: "manual" } });
    }

    reset();
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-row bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong"
      >
        + Add goal
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-panel border border-line bg-surface p-4"
    >
      <div className="flex flex-wrap gap-2">
        {(
          [
            ["skill", "Skill level"],
            ["wikisync", "Quest / Diary / CA / Collection log"],
            ["activity", "Boss / activity KC"],
            ["custom", "Custom"],
          ] as [GoalKind, string][]
        ).map(([value, label]) => (
          <button
            type="button"
            key={value}
            onClick={() => setKind(value)}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              kind === value
                ? "bg-accent text-on-accent"
                : "bg-surface-2 text-ink-2 hover:bg-line-strong"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {kind === "skill" && (
          <div className="flex flex-wrap gap-3">
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink"
            >
              {SKILLS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <input
              type="number"
              min={1}
              max={99}
              value={targetLevel}
              onChange={(e) => setTargetLevel(Number(e.target.value))}
              className="w-24 rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink"
            />
          </div>
        )}

        {kind === "activity" && (
          <div className="flex flex-wrap gap-3">
            <input
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              placeholder="Boss/activity name (as shown on hiscores)"
              className="min-w-[220px] flex-1 rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted"
            />
            <input
              type="number"
              min={1}
              value={targetScore}
              onChange={(e) => setTargetScore(Number(e.target.value))}
              className="w-24 rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink"
            />
          </div>
        )}

        {kind === "wikisync" && (
          <div className="space-y-2">
            {!members.some((m) => m.wikisync) && (
              <p className="text-xs text-accent">
                Sync an account on the Settings page first to pick from your live quest/diary/CA
                list.
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <select
                value={wikisyncCategory}
                onChange={(e) => setWikisyncCategory(e.target.value as WikiSyncCategory)}
                className="rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink"
              >
                {WIKISYNC_CATEGORY_OPTIONS.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              <select
                value={wikisyncItemId}
                onChange={(e) => setWikisyncItemId(e.target.value)}
                className="min-w-[220px] flex-1 rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink"
              >
                <option value="">Select an item...</option>
                {wikisyncItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} {item.completed ? "(done)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {kind === "custom" && (
          <input
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            placeholder="Goal title, e.g. 'Get 500m GP'"
            className="w-full rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted"
          />
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="submit"
          className="rounded-row bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong"
        >
          Add goal
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="rounded-row border border-line-strong px-4 py-2 text-sm text-ink-2 hover:bg-surface-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
