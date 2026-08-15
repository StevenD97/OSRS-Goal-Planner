import { useAccountStore } from "../state/useAccountStore";
import { Panel } from "../components/common/Panel";
import { Badge } from "../components/common/Badge";

export function SettingsPage() {
  const rsn = useAccountStore((s) => s.rsn);
  const setRsn = useAccountStore((s) => s.setRsn);
  const mode = useAccountStore((s) => s.mode);
  const setMode = useAccountStore((s) => s.setMode);
  const sync = useAccountStore((s) => s.sync);
  const syncing = useAccountStore((s) => s.syncing);
  const hiscores = useAccountStore((s) => s.hiscores);
  const wikisync = useAccountStore((s) => s.wikisync);
  const hiscoresError = useAccountStore((s) => s.hiscoresError);
  const wikisyncError = useAccountStore((s) => s.wikisyncError);
  const lastSyncedAt = useAccountStore((s) => s.lastSyncedAt);

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-slate-100">Settings</h1>
      <p className="mt-1 text-sm text-slate-400">
        Link your RuneScape name to auto-track skill levels (via the official Hiscores) and
        quests / diaries / combat achievements / collection log (via WikiSync).
      </p>

      <Panel className="mt-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sync();
          }}
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">
              RuneScape name
            </label>
            <input
              value={rsn}
              onChange={(e) => setRsn(e.target.value)}
              placeholder="Your OSRS username"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-amber-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-300">Account type</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as typeof mode)}
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            >
              <option value="normal">Normal</option>
              <option value="ironman">Ironman</option>
              <option value="hardcore">Hardcore Ironman</option>
              <option value="ultimate">Ultimate Ironman</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={syncing || !rsn.trim()}
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-amber-400 disabled:opacity-50"
          >
            {syncing ? "Syncing..." : "Sync now"}
          </button>
        </form>
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
          Sync status
        </h2>
        <div className="mt-3 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-24 text-slate-400">Hiscores</span>
            {hiscores ? (
              <Badge tone="green">
                Loaded - {hiscores.skills.find((s) => s.name === "Overall")?.level ?? "?"} total
                level
              </Badge>
            ) : hiscoresError ? (
              <Badge tone="red">{hiscoresError}</Badge>
            ) : (
              <Badge tone="neutral">Not synced</Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-24 text-slate-400">WikiSync</span>
            {wikisync && !wikisync.unparsed ? (
              <Badge tone="green">
                Loaded - {Object.values(wikisync.categories).flat().length} tracked items
              </Badge>
            ) : wikisyncError ? (
              <Badge tone="red">{wikisyncError}</Badge>
            ) : wikisync?.unparsed ? (
              <Badge tone="amber">Response received but unrecognised - see console</Badge>
            ) : (
              <Badge tone="neutral">Not synced</Badge>
            )}
          </div>
          {lastSyncedAt && (
            <p className="text-xs text-slate-500">
              Last synced {new Date(lastSyncedAt).toLocaleString()}
            </p>
          )}
        </div>
      </Panel>

      <Panel className="mt-4">
        <h2 className="text-sm font-semibold tracking-wide text-slate-400 uppercase">
          About WikiSync
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          WikiSync only has data for accounts that have installed the WikiSync plugin (RuneLite
          or HDOS) and logged in at least once - the same mechanism the OSRS Wiki itself uses for
          its "type your username" quest checklists. If your account hasn't done that yet, the
          Hiscores sync will still work, but Quest/Diary/Combat Achievement/Collection Log goals
          won't auto-complete.{" "}
          <a
            href="https://oldschool.runescape.wiki/w/RuneScape:WikiSync"
            target="_blank"
            rel="noreferrer"
            className="text-amber-400 hover:underline"
          >
            Learn more &amp; install WikiSync
          </a>
          .
        </p>
      </Panel>
    </div>
  );
}
