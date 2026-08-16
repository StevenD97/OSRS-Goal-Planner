import { useState } from "react";
import { Panel } from "../common/Panel";
import { useSyncStore } from "../../state/useSyncStore";

export function CloudSyncPanel() {
  const code = useSyncStore((s) => s.code);
  const status = useSyncStore((s) => s.status);
  const lastSyncedAt = useSyncStore((s) => s.lastSyncedAt);
  const errorMessage = useSyncStore((s) => s.errorMessage);
  const createCode = useSyncStore((s) => s.createCode);
  const disconnect = useSyncStore((s) => s.disconnect);
  const syncNow = useSyncStore((s) => s.syncNow);
  const restoreFromCode = useSyncStore((s) => s.restoreFromCode);

  const [restoreInput, setRestoreInput] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleRestore(e: React.FormEvent) {
    e.preventDefault();
    if (!restoreInput.trim()) return;
    if (!confirm("This replaces everything on this device with the cloud copy for that code. Continue?")) {
      return;
    }
    const ok = await restoreFromCode(restoreInput);
    if (ok) window.location.reload();
  }

  function handleCopy() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Panel className="mt-4">
      <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Cloud Sync</h2>
      <p className="mt-2 text-sm text-muted">
        Optional: save your data to the cloud so it follows you to another device or browser. There's no
        account or password - just a private code. Anyone with the code can view or overwrite this data,
        and it can't be recovered if lost, so keep it somewhere safe (a password manager, a note to
        yourself).
      </p>

      {code ? (
        <div className="mt-3">
          <div className="flex flex-wrap items-center gap-2">
            <code className="rounded-row border border-line-strong bg-surface-2 px-3 py-2 font-mono text-sm tracking-wide text-ink">
              {code}
            </code>
            <button
              onClick={handleCopy}
              className="rounded-row border border-line-strong px-3 py-2 text-sm text-ink-2 hover:bg-surface-2"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={() => syncNow()}
              disabled={status === "syncing"}
              className="rounded-row bg-accent px-3 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong disabled:opacity-50"
            >
              {status === "syncing" ? "Syncing..." : "Sync now"}
            </button>
            <button
              onClick={() => {
                if (confirm("Disconnect cloud sync on this device? The cloud copy itself isn't deleted.")) {
                  disconnect();
                }
              }}
              className="text-xs text-muted hover:text-danger"
            >
              Disconnect
            </button>
          </div>
          {lastSyncedAt && (
            <p className="mt-2 text-xs text-muted">
              Last synced {new Date(lastSyncedAt).toLocaleString()}
            </p>
          )}
          {status === "error" && errorMessage && (
            <p className="mt-2 text-xs text-danger">{errorMessage}</p>
          )}
        </div>
      ) : (
        <button
          onClick={createCode}
          className="mt-3 rounded-row bg-accent px-4 py-2 text-sm font-medium text-on-accent hover:bg-accent-strong"
        >
          Set up cloud sync
        </button>
      )}

      <div className="mt-4 border-t border-line pt-4">
        <p className="text-xs text-muted">Already have a code from another device?</p>
        <form onSubmit={handleRestore} className="mt-2 flex flex-wrap gap-2">
          <input
            value={restoreInput}
            onChange={(e) => setRestoreInput(e.target.value)}
            placeholder="XXXX-XXXX-XXXX"
            className="min-w-[180px] flex-1 rounded-row border border-line-strong bg-surface px-3 py-2 font-mono text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={!restoreInput.trim() || status === "syncing"}
            className="rounded-row border border-line-strong px-4 py-2 text-sm text-ink-2 hover:bg-surface-2 disabled:opacity-50"
          >
            Restore
          </button>
        </form>
        {status === "error" && !code && errorMessage && (
          <p className="mt-2 text-xs text-danger">{errorMessage}</p>
        )}
      </div>
    </Panel>
  );
}
