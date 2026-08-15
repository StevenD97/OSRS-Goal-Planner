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
    <li className="flex flex-wrap items-center gap-3 rounded-row border border-line bg-surface-2 px-3 py-2">
      <span className="min-w-[120px] font-medium text-ink">{member.rsn}</span>

      <select
        value={member.mode}
        onChange={(e) => onModeChange(e.target.value as HiscoresMode)}
        className="rounded-row border border-line-strong bg-surface px-2 py-1 text-xs text-ink-2"
      >
        {MODE_OPTIONS.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      <div className="flex flex-1 flex-wrap items-center gap-2">
        {member.hiscores ? (
          <Badge tone="accent">
            Lvl {member.hiscores.skills.find((s) => s.name === "Overall")?.level ?? "?"}
          </Badge>
        ) : member.hiscoresError ? (
          <Badge tone="danger">Hiscores: {member.hiscoresError}</Badge>
        ) : (
          <Badge tone="neutral">Not synced</Badge>
        )}
        {member.wikisync && !member.wikisync.unparsed ? (
          <Badge tone="accent">
            WikiSync: {Object.values(member.wikisync.categories).flat().length} items
          </Badge>
        ) : member.wikisyncError ? (
          <Badge tone="danger">WikiSync: {member.wikisyncError}</Badge>
        ) : null}
      </div>

      <button
        onClick={onRemove}
        className="flex-none text-xs text-muted hover:text-danger"
      >
        Remove
      </button>
    </li>
  );
}
