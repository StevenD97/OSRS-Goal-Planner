import type { ReactNode } from "react";
import { clsx } from "clsx";

const TONES = {
  neutral: "bg-slate-800 text-slate-300",
  amber: "bg-amber-500/10 text-amber-400",
  green: "bg-emerald-500/10 text-emerald-400",
  red: "bg-rose-500/10 text-rose-400",
  blue: "bg-sky-500/10 text-sky-400",
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
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        TONES[tone],
      )}
    >
      {children}
    </span>
  );
}
