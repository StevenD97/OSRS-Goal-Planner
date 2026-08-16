import { useState } from "react";
import { useAccountStore } from "../state/useAccountStore";
import { SkillsTab } from "../components/group/SkillsTab";
import { GearTab } from "../components/group/GearTab";

type TabValue = "skills" | "gear";

const TABS: { value: TabValue; label: string }[] = [
  { value: "skills", label: "Skills" },
  { value: "gear", label: "Gear" },
];

export function GroupDashboardPage() {
  const [tab, setTab] = useState<TabValue>("skills");
  const members = useAccountStore((s) => s.members);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-ink">Group Dashboard</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          A shared view of the whole team's progress - who's ahead on which skill, and what gear
          the group still needs to hunt down to get everyone raid ready.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              tab === t.value
                ? "bg-accent text-on-accent"
                : "bg-surface-2 text-ink-2 hover:bg-line-strong"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "skills" ? <SkillsTab members={members} /> : <GearTab />}
    </div>
  );
}
