import { Link } from "react-router-dom";
import type { GroupMember } from "../../state/useAccountStore";
import { SKILL_BAR_ORDER } from "../../data/skillBarOrder";
import { aggregateSkillLevel } from "../../lib/groupAggregate";
import { Panel } from "../common/Panel";

function levelFor(member: GroupMember, skill: string): number | null {
  const entry = member.hiscores?.skills.find((s) => s.name === skill);
  return entry ? entry.level : null;
}

export function SkillsTab({ members }: { members: GroupMember[] }) {
  if (members.length === 0) {
    return (
      <Panel className="border-accent/40 bg-accent-soft">
        <p className="text-sm text-ink-2">
          No accounts linked yet.{" "}
          <Link to="/settings" className="text-accent hover:underline">
            Link your Group Ironman roster in Settings
          </Link>{" "}
          to see everyone's skill levels side by side.
        </p>
      </Panel>
    );
  }

  return (
    <Panel className="overflow-x-auto">
      <table className="w-full min-w-[480px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs font-semibold tracking-wide text-muted uppercase">
            <th className="sticky left-0 bg-surface py-2 pr-4">Skill</th>
            {members.map((m) => (
              <th key={m.rsn} className="px-3 py-2 text-right font-mono">
                {m.rsn}
              </th>
            ))}
            <th className="px-3 py-2 text-right text-accent">Group Max</th>
          </tr>
        </thead>
        <tbody>
          {SKILL_BAR_ORDER.map((skill) => {
            const groupMax = aggregateSkillLevel(members, skill);
            return (
              <tr key={skill} className="border-b border-line last:border-b-0 hover:bg-surface-2">
                <td className="sticky left-0 bg-surface py-1.5 pr-4 font-medium text-ink">
                  {skill}
                </td>
                {members.map((m) => {
                  const level = levelFor(m, skill);
                  return (
                    <td
                      key={m.rsn}
                      className="px-3 py-1.5 text-right font-mono tabular-nums text-ink-2"
                    >
                      {level ?? <span className="text-muted">-</span>}
                    </td>
                  );
                })}
                <td className="px-3 py-1.5 text-right font-mono font-semibold tabular-nums text-accent">
                  {groupMax >= 0 ? groupMax : <span className="text-muted">-</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-muted">
        Levels come from each member's Hiscores sync (Settings &rarr; Sync all). "Group Max" is
        the highest level anyone in the group has reached for that skill - handy for checking
        whether the group as a whole clears a requirement, even if no single member does alone.
      </p>
    </Panel>
  );
}
