import { NavLink } from "react-router-dom";
import { clsx } from "clsx";
import { useAccountStore } from "../../state/useAccountStore";

const LINKS = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/goals", label: "Goals" },
  { to: "/dailies", label: "Dailies" },
  { to: "/farm-runs", label: "Farm Runs" },
  { to: "/gear", label: "Gear" },
  { to: "/action-tracker", label: "Action Tracker" },
  { to: "/settings", label: "Settings" },
];

export function NavBar() {
  const members = useAccountStore((s) => s.members);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <span className="text-lg font-semibold tracking-tight text-amber-400">
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
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-amber-500/10 text-amber-400"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="text-sm text-slate-400">
          {members.length === 0 ? (
            <span className="italic">No accounts linked</span>
          ) : members.length === 1 ? (
            <span>
              Tracking <span className="font-medium text-slate-200">{members[0].rsn}</span>
            </span>
          ) : (
            <span>
              Tracking group of{" "}
              <span className="font-medium text-slate-200">{members.length}</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
