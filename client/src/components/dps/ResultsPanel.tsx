import type { DpsResult } from "../../types/dpsCalculator";
import { Panel } from "../common/Panel";

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs font-semibold tracking-wide text-muted uppercase">{label}</div>
      <div className="mt-1 font-mono text-2xl font-semibold tabular-nums text-ink">{value}</div>
    </div>
  );
}

export function ResultsPanel({ result }: { result: DpsResult }) {
  return (
    <Panel>
      <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">Results</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatBox label="Max hit" value={String(result.maxHit)} />
        <StatBox label="Accuracy" value={`${(result.hitChance * 100).toFixed(1)}%`} />
        <StatBox label="DPS" value={result.dps.toFixed(2)} />
        <StatBox
          label="Time to kill"
          value={result.timeToKillSeconds ? `${result.timeToKillSeconds.toFixed(1)}s` : "-"}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3 text-xs text-muted sm:grid-cols-4">
        <div>
          Effective attack level: <span className="font-mono tabular-nums text-ink-2">{result.effectiveAttackLevel}</span>
        </div>
        <div>
          Effective strength level: <span className="font-mono tabular-nums text-ink-2">{result.effectiveStrengthLevel}</span>
        </div>
        <div>
          Attack roll: <span className="font-mono tabular-nums text-ink-2">{result.attackRoll}</span>
        </div>
        <div>
          Defence roll: <span className="font-mono tabular-nums text-ink-2">{result.defenceRoll}</span>
        </div>
      </div>
    </Panel>
  );
}
