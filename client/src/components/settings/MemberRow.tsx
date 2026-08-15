import type { GroupMember } from "../../state/useAccountStore";
import type { HiscoresMode } from "../../types/hiscores";
import { Badge } from "../common/Badge";

const MODE_OPTIONS: { value: HiscoresMode; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "ironman", label: "Ironman" },
  { value: "hardcore", label: "Hardcore Ironman" },
  { value: "ultimate", label: "Ultimate Ironman" },
];

export function MemberRow({
  member,
  onModeChange,
  onRemove,
}: {
  member: GroupMember;
  onModeChange: (mode: HiscoresMode) => void;
  onRemove: () => void;
}) {
  return (
    <li className="flex flex-wrap items-center gap-3 rounded-md border border-slate-800 bg-slate-900/40 px-3 py-2">
      <span className="min-w-[120px] font-medium text-slate-100">{member.rsn}</span>

      <select
        value={member.mode}
        onChange={(e) => onModeChange(e.target.value as HiscoresMode)}
        className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300"
      >
        {MODE_OPTIONS.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      <div className="flex flex-1 flex-wrap items-center gap-2">
        {member.hiscores ? (
          <Badge tone="green">
            Lvl {member.hiscores.skills.find((s) => s.name === "Overall")?.level ?? "?"}
          </Badge>
        ) : member.hiscoresError ? (
          <Badge tone="red">Hiscores: {member.hiscoresError}</Badge>
        ) : (
          <Badge tone="neutral">Not synced</Badge>
        )}
        {member.wikisync && !member.wikisync.unparsed ? (
          <Badge tone="green">
            WikiSync: {Object.values(member.wikisync.categories).flat().length} items
          </Badge>
        ) : member.wikisyncError ? (
          <Badge tone="red">WikiSync: {member.wikisyncError}</Badge>
        ) : null}
      </div>

      <button
        onClick={onRemove}
        className="flex-none text-xs text-slate-500 hover:text-rose-400"
      >
        Remove
      </button>
    </li>
  );
}
