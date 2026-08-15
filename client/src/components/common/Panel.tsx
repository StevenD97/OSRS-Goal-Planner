import type { ReactNode } from "react";
import { clsx } from "clsx";

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-lg border border-slate-800 bg-slate-900/60 p-4 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
