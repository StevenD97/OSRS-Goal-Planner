import { FARM_RUNS } from "../data/farmRuns";
import { FarmRunCard } from "../components/farmruns/FarmRunCard";

export function FarmRunsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink">Farm Runs</h1>
        <p className="mt-1 text-sm text-muted">
          Step-by-step preset checklists compiled from the{" "}
          <a
            href="https://oldschool.runescape.wiki/w/Farming_runs"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            OSRS Wiki's Farming runs guide
          </a>
          . Pick a run, work through the checklist, and it resets automatically at the next
          daily reset (00:00 UTC).
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FARM_RUNS.map((run) => (
          <FarmRunCard key={run.id} run={run} />
        ))}
      </div>
    </div>
  );
}
