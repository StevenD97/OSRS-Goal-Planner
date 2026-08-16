import { useEffect } from "react";
import { useSyncStore } from "../../state/useSyncStore";

const AUTO_SYNC_INTERVAL_MS = 60_000;

/**
 * Renders nothing - just keeps a connected sync code's cloud copy fresh in
 * the background (periodic push + push right before the tab goes away),
 * so the device actively in use is the one "remembering" for the group.
 * See lib/cloudSync.ts for the push/pull mechanics.
 */
export function CloudSyncScheduler() {
  const code = useSyncStore((s) => s.code);
  const syncNow = useSyncStore((s) => s.syncNow);

  useEffect(() => {
    if (!code) return;

    const interval = setInterval(() => {
      syncNow();
    }, AUTO_SYNC_INTERVAL_MS);

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") syncNow();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [code, syncNow]);

  return null;
}
