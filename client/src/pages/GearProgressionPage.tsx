import { useMemo, useState } from "react";
import { GEAR_PROGRESSION } from "../data/gearProgression";
import type { CombatStyle } from "../types/gearProgression";
import { STYLE_LABELS } from "../types/gearProgression";
import { TierSection } from "../components/gear/TierSection";
import { ProgressBar } from "../components/common/ProgressBar";
import { useGearProgressionStore } from "../state/useGearProgressionStore";

type TabValue = "all" | CombatStyle;

const TABS: { value: TabValue; label: string }[] = [
  { value: "all", label: "All Gear" },
  { value: "melee", label: "Melee" },
  { value: "ranged", label: "Ranged" },
  { value: "magic", label: "Magic" },
  { value: "shared", label: "Shared / Utility" },
];

export function GearProgressionPage() {
  const [tab, setTab] = useState<TabValue>("all");
  const [query, setQuery] = useState("");
  const obtained = useGearProgressionStore((s) => s.obtained);

  const allItems = useMemo(() => GEAR_PROGRESSION.flatMap((t) => t.items), []);
  const totalDone = allItems.filter((i) => obtained[i.id]).length;
  const normalizedQuery = query.trim().toLowerCase();

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Gear Progression</h1>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            An ironman-focused progression path from early game to best-in-slot, current as of
            mid-2026. Every item lists how an ironman actually gets it, since the GE isn't an
            option. Check items off as you obtain them.
          </p>
        </div>
        <div className="flex min-w-[200px] items-center gap-2">
          <ProgressBar value={allItems.length ? (totalDone / allItems.length) * 100 : 0} />
          <span className="flex-none text-sm text-muted">
            {totalDone}/{allItems.length}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an item (e.g. Scorching bow, Occult necklace)..."
          className="w-full max-w-md rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
        />
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

      <div className="space-y-4">
        {GEAR_PROGRESSION.map((tier) => {
          const byStyle =
            tab === "all"
              ? tier.items
              : tab === "shared"
                ? tier.items.filter((i) => i.style === "shared")
                : tier.items.filter((i) => i.style === tab || i.style === "shared");
          const items = normalizedQuery
            ? byStyle.filter((i) => i.item.toLowerCase().includes(normalizedQuery))
            : byStyle;
          return (
            <TierSection key={tier.id} tier={tier} items={items} showStyleBadge={tab === "all"} />
          );
        })}
      </div>

      <p className="mt-6 text-xs text-muted">
        Compiled from OSRS Wiki item/boss pages and current ironman progression guides. Late game
        is nonlinear - after core raid gear, prioritise whichever branch (
        {STYLE_LABELS.ranged}/{STYLE_LABELS.magic}/{STYLE_LABELS.melee}) matches the content you
        actually want to do. Double-check drop sources in-game if something looks off, especially
        for the newest bosses.
      </p>
    </div>
  );
}
