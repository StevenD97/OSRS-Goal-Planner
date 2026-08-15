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
        "rounded-panel border border-line bg-surface p-4 shadow-[var(--hairline)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
