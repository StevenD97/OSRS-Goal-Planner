import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { CloudSyncScheduler } from "./CloudSyncScheduler";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-canvas">
      <CloudSyncScheduler />
      <Sidebar />
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
