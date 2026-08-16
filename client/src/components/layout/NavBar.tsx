import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import { useAccountStore } from "../../state/useAccountStore";

const LINKS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/goals", label: "Goals" },
  { to: "/dailies", label: "Dailies" },
  { to: "/farm-runs", label: "Farm Runs" },
  { to: "/gear", label: "Gear" },
  { to: "/group", label: "Group" },
  { to: "/action-tracker", label: "Action Tracker" },
  { to: "/dps-calc", label: "DPS Calc" },
  { to: "/settings", label: "Settings" },
];

export function NavBar() {
  const members = useAccountStore((s) => s.members);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <span className="font-display text-lg font-semibold tracking-tight text-accent">
            OSRS Goal Planner
          </span>
          <nav className="flex gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  clsx(
                    "rounded-row px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:bg-surface-2 hover:text-ink",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="text-sm text-muted">
          {members.length === 0 ? (
            <span className="italic">No accounts linked</span>
          ) : members.length === 1 ? (
            <span>
              Tracking <span className="font-medium text-ink">{members[0].rsn}</span>
            </span>
          ) : (
            <span>
              Tracking group of{" "}
              <span className="font-medium text-ink">{members.length}</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
