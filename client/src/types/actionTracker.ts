export type PlanStep =
  | { id: string; kind: "quest"; questId: string; questName: string }
  | { id: string; kind: "skill"; skill: string; level: number }
  | { id: string; kind: "other"; label: string }
  | { id: string; kind: "gearItem"; gearItemId: string; itemName: string };

export interface ActionPlan {
  id: string;
  targetLabel: string;
  targetGearItemId: string;
  createdAt: number;
  /** Snapshot of the resolved step order at creation time. */
  steps: PlanStep[];
}
