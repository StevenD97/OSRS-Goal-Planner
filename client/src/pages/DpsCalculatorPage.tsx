import { useMemo, useState } from "react";
import { useDpsCalculatorStore } from "../state/useDpsCalculatorStore";
import { useGearProgressionStore } from "../state/useGearProgressionStore";
import { useAccountStore } from "../state/useAccountStore";
import { aggregateSkillLevel } from "../lib/groupAggregate";
import { PRAYERS } from "../data/prayers";
import { POTION_BOOSTS } from "../data/potionBoosts";
import { SPELLS } from "../data/spells";
import { MONSTERS } from "../data/monsters";
import { DPS_EQUIPMENT_BY_ID } from "../lib/dpsAggregate";
import { aggregateEquipmentBonuses } from "../lib/dpsAggregate";
import { resolveDps } from "../lib/dpsResolve";
import { suggestLoadout } from "../lib/loadoutOptimizer";
import type { CombatBonuses, CombatStyle, DpsSlot, Monster } from "../types/dpsCalculator";
import { Panel } from "../components/common/Panel";
import { EquipmentSlotSelect } from "../components/dps/EquipmentSlotSelect";
import { ResultsPanel } from "../components/dps/ResultsPanel";

const STYLE_TABS: { value: CombatStyle; label: string }[] = [
  { value: "melee", label: "Melee" },
  { value: "ranged", label: "Ranged" },
  { value: "magic", label: "Magic" },
];

const SLOTS_BY_STYLE: Record<CombatStyle, DpsSlot[]> = {
  melee: ["weapon", "shield", "head", "cape", "neck", "body", "legs", "hands", "feet", "ring"],
  ranged: ["weapon", "ammo", "head", "cape", "neck", "body", "legs", "hands", "feet", "ring"],
  magic: ["weapon", "shield", "head", "cape", "neck", "body", "legs", "hands", "feet", "ring"],
};

const STANCE_OPTIONS: Record<CombatStyle, { value: string; label: string }[]> = {
  melee: [
    { value: "accurate", label: "Accurate (+3 Attack)" },
    { value: "aggressive", label: "Aggressive (+3 Strength)" },
    { value: "controlled", label: "Controlled (+1 all)" },
    { value: "defensive", label: "Defensive (+3 Defence)" },
  ],
  ranged: [
    { value: "accurate", label: "Accurate (+3 Ranged)" },
    { value: "rapid", label: "Rapid (-1 tick attack speed)" },
    { value: "longrange", label: "Longrange (+3 Defence)" },
  ],
  magic: [
    { value: "standard", label: "Standard" },
    { value: "defensive", label: "Defensive autocast (+3 Defence)" },
  ],
};

const LEVEL_KEYS = ["attack", "strength", "defence", "ranged", "magic", "hitpoints"] as const;
const LEVEL_LABELS: Record<(typeof LEVEL_KEYS)[number], string> = {
  attack: "Attack",
  strength: "Strength",
  defence: "Defence",
  ranged: "Ranged",
  magic: "Magic",
  hitpoints: "Hitpoints",
};

const BONUS_FIELDS: { key: keyof CombatBonuses; label: string }[] = [
  { key: "attackStab", label: "Attack (stab)" },
  { key: "attackSlash", label: "Attack (slash)" },
  { key: "attackCrush", label: "Attack (crush)" },
  { key: "attackMagic", label: "Attack (magic)" },
  { key: "attackRanged", label: "Attack (ranged)" },
  { key: "meleeStrength", label: "Melee strength" },
  { key: "rangedStrength", label: "Ranged strength" },
  { key: "magicDamage", label: "Magic damage %" },
  { key: "prayerBonus", label: "Prayer bonus" },
];

export function DpsCalculatorPage() {
  const store = useDpsCalculatorStore();
  const obtainedGear = useGearProgressionStore((s) => s.obtained);
  const members = useAccountStore((s) => s.members);
  const [onlyOwned, setOnlyOwned] = useState(true);
  const [customizingBonuses, setCustomizingBonuses] = useState(false);

  const obtainedGearIds = useMemo(
    () => new Set(Object.entries(obtainedGear).filter(([, v]) => v).map(([k]) => k)),
    [obtainedGear],
  );

  const equippedForStyle = store.equipped[store.style];
  const weaponId = equippedForStyle.weapon;
  const weapon = weaponId ? DPS_EQUIPMENT_BY_ID[weaponId] : undefined;

  const attackType =
    store.style === "melee" ? (weapon?.attackType ?? "crush") : store.style === "ranged" ? "ranged" : "magic";
  let attackSpeed = weapon?.attackSpeed ?? (store.style === "magic" ? 5 : 4);
  if (store.style === "ranged" && store.stance === "rapid") attackSpeed = Math.max(1, attackSpeed - 1);

  const rawBonuses = aggregateEquipmentBonuses(equippedForStyle);
  const isShadow = weaponId === "w-tumekens-shadow";
  const equipmentBonuses: CombatBonuses = {
    ...rawBonuses,
    magicDamage: isShadow ? rawBonuses.magicDamage * 3 : rawBonuses.magicDamage,
  };
  const bonuses: CombatBonuses = { ...equipmentBonuses, ...(store.manualOverride ?? {}) };

  const prayer = PRAYERS.find((p) => p.id === store.prayerId) ?? PRAYERS[0];
  const potion = POTION_BOOSTS.find((p) => p.id === store.potionId) ?? POTION_BOOSTS[0];
  const spell = SPELLS.find((s) => s.id === store.spellId) ?? SPELLS[0];

  const monster: Monster =
    store.targetId === "custom"
      ? { id: "custom", name: "Custom target", magicLevel: 1, ...store.customTarget }
      : (MONSTERS.find((m) => m.id === store.targetId) ?? MONSTERS[0]);

  const extraPercent = store.vsUndead ? 20 : store.onSlayerTask ? (store.style === "melee" ? 16.6667 : 15) : 0;

  const result = resolveDps({
    style: store.style,
    attackType,
    attackSpeedTicks: attackSpeed,
    levels: store.levels,
    prayerAttackPercent: prayer.attackPercent,
    prayerStrengthPercent: prayer.strengthPercent,
    prayerDefencePercent: prayer.defencePercent,
    potionPercent: potion.percent,
    potionFlat: potion.flat,
    stance: store.stance as never,
    bonuses,
    spellBaseMaxHit: spell.baseMaxHit,
    extraDamagePercent: extraPercent,
    extraAccuracyPercent: extraPercent,
    monster,
  });

  function handleSuggestLoadout() {
    const suggestion = suggestLoadout(store.style, attackType, obtainedGearIds, onlyOwned);
    store.applyLoadout(store.style, suggestion);
  }

  function handleFillFromAccount() {
    for (const key of ["attack", "strength", "defence", "ranged", "magic"] as const) {
      const skillName = key === "attack" ? "Attack" : key === "strength" ? "Strength" : key === "defence" ? "Defence" : key === "ranged" ? "Ranged" : "Magic";
      const level = aggregateSkillLevel(members, skillName);
      if (level > 0) store.setLevel(key, level);
    }
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-ink">DPS Calculator</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Standard OSRS accuracy-roll/max-hit combat formulas. Pick a style, fill in your setup,
          and see max hit, accuracy, DPS and time to kill against a target - or hit "Suggest
          loadout" to auto-equip the best gear you actually have.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {STYLE_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => store.setStyle(tab.value)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ${
              store.style === tab.value ? "bg-accent text-on-accent" : "bg-surface-2 text-ink-2 hover:bg-line-strong"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Panel>
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Levels</h2>
              {members.length > 0 && (
                <button
                  onClick={handleFillFromAccount}
                  className="text-xs text-accent hover:underline"
                >
                  Fill from synced account
                </button>
              )}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {LEVEL_KEYS.map((key) => (
                <label key={key} className="text-xs text-muted">
                  {LEVEL_LABELS[key]}
                  <input
                    type="number"
                    min={1}
                    max={126}
                    value={store.levels[key]}
                    onChange={(e) => store.setLevel(key, Number(e.target.value))}
                    className="mt-1 w-full rounded-row border border-line-strong bg-surface px-2 py-1 text-sm text-ink"
                  />
                </label>
              ))}
            </div>
          </Panel>

          <Panel>
            <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
              Prayer, Potion &amp; Stance
            </h2>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <label className="text-xs text-muted">
                Prayer
                <select
                  value={store.prayerId}
                  onChange={(e) => store.setPrayerId(e.target.value)}
                  className="mt-1 w-full rounded-row border border-line-strong bg-surface px-2 py-1.5 text-sm text-ink"
                >
                  {PRAYERS.filter((p) => p.style === store.style || p.id === "none").map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs text-muted">
                Potion boost
                <select
                  value={store.potionId}
                  onChange={(e) => store.setPotionId(e.target.value)}
                  className="mt-1 w-full rounded-row border border-line-strong bg-surface px-2 py-1.5 text-sm text-ink"
                >
                  {POTION_BOOSTS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs text-muted">
                Combat stance
                <select
                  value={store.stance}
                  onChange={(e) => store.setStance(e.target.value as never)}
                  className="mt-1 w-full rounded-row border border-line-strong bg-surface px-2 py-1.5 text-sm text-ink"
                >
                  {STANCE_OPTIONS[store.style].map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {store.style === "magic" && (
              <label className="mt-3 block text-xs text-muted">
                Spell
                <select
                  value={store.spellId}
                  onChange={(e) => store.setSpellId(e.target.value)}
                  className="mt-1 w-full rounded-row border border-line-strong bg-surface px-2 py-1.5 text-sm text-ink"
                >
                  {SPELLS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (base {s.baseMaxHit})
                    </option>
                  ))}
                </select>
                <span className="mt-1 block text-muted">
                  Using a powered staff (Trident, Sanguinesti staff, Tumeken's Shadow, etc.)? Pick
                  "Custom" above, then set the base max hit in the bonuses panel below - the wiki's
                  "Maximum magic hit" page has the exact number for your Magic level.
                </span>
              </label>
            )}

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-ink-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={store.onSlayerTask}
                  onChange={(e) => store.setOnSlayerTask(e.target.checked)}
                  className="h-4 w-4 accent-accent"
                />
                On Slayer task (assumes slayer helmet (i) / black mask (i) worn)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={store.vsUndead}
                  onChange={(e) => store.setVsUndead(e.target.checked)}
                  className="h-4 w-4 accent-accent"
                />
                Target is undead (assumes salve amulet (ei) worn)
              </label>
            </div>
          </Panel>

          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Equipment</h2>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-ink-2">
                  <input
                    type="checkbox"
                    checked={onlyOwned}
                    onChange={(e) => setOnlyOwned(e.target.checked)}
                    className="h-4 w-4 accent-accent"
                  />
                  Only gear I have
                </label>
                <button
                  onClick={handleSuggestLoadout}
                  className="rounded-row bg-accent px-3 py-1.5 text-xs font-medium text-on-accent hover:bg-accent-strong"
                >
                  Suggest loadout
                </button>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              {SLOTS_BY_STYLE[store.style].map((slot) => (
                <EquipmentSlotSelect
                  key={slot}
                  slot={slot}
                  style={store.style}
                  value={equippedForStyle[slot]}
                  onChange={(itemId) => store.equipItem(slot, itemId)}
                  obtainedGearIds={obtainedGearIds}
                />
              ))}
            </div>
            {weapon?.notes && <p className="mt-3 text-xs text-muted italic">{weapon.notes}</p>}
          </Panel>

          <Panel>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
                Aggregate bonuses
              </h2>
              <button
                onClick={() => {
                  if (customizingBonuses) {
                    store.setManualOverride(null);
                    setCustomizingBonuses(false);
                  } else {
                    store.setManualOverride({ ...equipmentBonuses });
                    setCustomizingBonuses(true);
                  }
                }}
                className="text-xs text-accent hover:underline"
              >
                {customizingBonuses ? "Reset to equipment" : "Override with custom numbers"}
              </button>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {BONUS_FIELDS.map(({ key, label }) => (
                <label key={key} className="text-xs text-muted">
                  {label}
                  <input
                    type="number"
                    value={bonuses[key]}
                    disabled={!customizingBonuses}
                    onChange={(e) =>
                      store.setManualOverride({ ...(store.manualOverride ?? equipmentBonuses), [key]: Number(e.target.value) })
                    }
                    className="mt-1 w-full rounded-row border border-line-strong bg-surface px-2 py-1 text-sm text-ink disabled:opacity-60"
                  />
                </label>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Target</h2>
            <select
              value={store.targetId}
              onChange={(e) => store.setTargetId(e.target.value)}
              className="mt-3 w-full rounded-row border border-line-strong bg-surface px-2 py-1.5 text-sm text-ink"
            >
              {MONSTERS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
              <option value="custom">Custom target...</option>
            </select>

            {store.targetId === "custom" ? (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(
                  [
                    ["hitpoints", "Hitpoints"],
                    ["defenceLevel", "Defence level"],
                    ["defenceStab", "Defence (stab)"],
                    ["defenceSlash", "Defence (slash)"],
                    ["defenceCrush", "Defence (crush)"],
                    ["defenceMagic", "Defence (magic)"],
                    ["defenceRanged", "Defence (ranged)"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="text-xs text-muted">
                    {label}
                    <input
                      type="number"
                      value={store.customTarget[key]}
                      onChange={(e) => store.setCustomTarget({ [key]: Number(e.target.value) })}
                      className="mt-1 w-full rounded-row border border-line-strong bg-surface px-2 py-1 text-sm text-ink"
                    />
                  </label>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-xs text-muted">
                {monster.hitpoints} HP - Defence level {monster.defenceLevel}
                {monster.notes && <span className="mt-1 block italic">{monster.notes}</span>}
              </p>
            )}
          </Panel>

          <ResultsPanel result={result} />

          <p className="text-xs text-muted">
            Standard accuracy-roll/max-hit formulas, verified against the OSRS Wiki's documented
            examples. A few weapon-specific passives aren't modeled (Twisted bow's magic-level
            scaling, Scythe of Vitur's multi-hit, Osmumten's fang's reroll) - see notes on those
            items. Treat this as a strong estimate, not a byte-for-byte simulation.
          </p>
        </div>
      </div>
    </div>
  );
}
