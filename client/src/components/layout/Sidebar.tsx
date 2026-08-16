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

export function Sidebar() {
  const members = useAccountStore((s) => s.members);

  return (
    <aside className="sidebar-texture sticky top-0 flex h-screen w-52 flex-none flex-col border-r border-sidebar-border sm:w-56">
      <div className="px-4 py-5">
        <span className="font-display text-lg leading-tight font-semibold tracking-tight text-sidebar-ink">
          OSRS Goal Planner
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              clsx(
                "rounded-row px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-active text-sidebar-active-ink"
                  : "text-sidebar-ink-muted hover:bg-sidebar-active/50 hover:text-sidebar-ink",
              )
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4 text-xs text-sidebar-ink-muted">
        {members.length === 0 ? (
          <span className="italic">No accounts linked</span>
        ) : members.length === 1 ? (
          <span>
            Tracking <span className="font-medium text-sidebar-ink">{members[0].rsn}</span>
          </span>
        ) : (
          <span>
            Tracking group of{" "}
            <span className="font-medium text-sidebar-ink">{members.length}</span>
          </span>
        )}
      </div>
    </aside>
  );
}
