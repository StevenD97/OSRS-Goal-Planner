import { useState } from "react";
import { useAccountStore } from "../state/useAccountStore";
import { Panel } from "../components/common/Panel";
import { MemberRow } from "../components/settings/MemberRow";

export function SettingsPage() {
  const members = useAccountStore((s) => s.members);
  const addMember = useAccountStore((s) => s.addMember);
  const addMembers = useAccountStore((s) => s.addMembers);
  const removeMember = useAccountStore((s) => s.removeMember);
  const setMemberMode = useAccountStore((s) => s.setMemberMode);
  const syncAll = useAccountStore((s) => s.syncAll);
  const syncing = useAccountStore((s) => s.syncing);
  const lastSyncedAt = useAccountStore((s) => s.lastSyncedAt);

  const [singleRsn, setSingleRsn] = useState("");
  const [bulkText, setBulkText] = useState("");

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-ink">Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Link one account, or a whole Group Ironman roster. Skills/bosses (Hiscores) and quests /
        diaries / combat achievements / collection log (WikiSync) get pulled per account - and any
        requirement is treated as met for the group if <em>any</em> member has it, since gear and
        unlocks are effectively pooled on a GIM team.
      </p>

      <Panel className="mt-6">
        <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
          Add an account
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addMember(singleRsn);
            setSingleRsn("");
          }}
          className="mt-3 flex flex-wrap gap-2"
        >
          <input
            value={singleRsn}
            onChange={(e) => setSingleRsn(e.target.value)}
            placeholder="RuneScape name"
            className="min-w-[200px] flex-1 rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={!singleRsn.trim()}
            className="rounded-row bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong disabled:opacity-50"
          >
            Add
          </button>
        </form>

        <details className="mt-4">
          <summary className="cursor-pointer text-sm text-muted hover:text-ink">
            Add a whole Group Ironman roster at once
          </summary>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const names = bulkText.split(/[\n,]/).map((n) => n.trim()).filter(Boolean);
              addMembers(names);
              setBulkText("");
            }}
            className="mt-2 space-y-2"
          >
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder={"Paste your group's names - one per line, or comma-separated"}
              rows={4}
              className="w-full rounded-row border border-line-strong bg-surface px-3 py-2 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              disabled={!bulkText.trim()}
              className="rounded-row border border-line-strong px-4 py-2 text-sm text-ink-2 hover:bg-surface-2 disabled:opacity-50"
            >
              Add all
            </button>
          </form>
        </details>
      </Panel>

      <Panel className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
            {members.length > 1 ? "Group members" : "Account"}
          </h2>
          <button
            onClick={() => syncAll()}
            disabled={syncing || members.length === 0}
            className="rounded-row bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong disabled:opacity-50"
          >
            {syncing ? "Syncing..." : "Sync all"}
          </button>
        </div>

        {members.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No accounts linked yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {members.map((member) => (
              <MemberRow
                key={member.rsn}
                member={member}
                onModeChange={(mode) => setMemberMode(member.rsn, mode)}
                onRemove={() => removeMember(member.rsn)}
              />
            ))}
          </ul>
        )}

        {lastSyncedAt && (
          <p className="mt-3 text-xs text-muted">
            Last synced {new Date(lastSyncedAt).toLocaleString()}
          </p>
        )}
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">
          About WikiSync
        </h2>
        <p className="mt-2 text-sm text-muted">
          WikiSync only has data for accounts that have installed the WikiSync plugin (RuneLite
          or HDOS) and logged in at least once - the same mechanism the OSRS Wiki itself uses for
          its "type your username" quest checklists. Hiscores sync works for any account with
          public hiscores, no opt-in required. For a group, only members who've run WikiSync will
          contribute quest/diary/CA/collection-log data - it's fine if not everyone has, since any
          one member's progress counts for the whole group.{" "}
          <a
            href="https://oldschool.runescape.wiki/w/RuneScape:WikiSync"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            Learn more &amp; install WikiSync
          </a>
          .
        </p>
      </Panel>
    </div>
  );
}
