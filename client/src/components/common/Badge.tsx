import type { ReactNode } from "react";
import { clsx } from "clsx";

const TONES = {
  neutral: "bg-surface-2 text-ink-2",
  accent: "bg-accent-soft text-accent-strong",
  bronze: "bg-bronze-soft text-bronze",
  danger: "bg-danger-soft text-danger",
  melee: "bg-melee/10 text-melee",
  ranged: "bg-ranged/10 text-ranged",
  magic: "bg-magic/10 text-magic",
  shared: "bg-shared/10 text-shared",
} as const;

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-chip px-2 py-0.5 text-xs font-medium tracking-wide",
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}
