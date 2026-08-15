export type DailyTaskCategory = "Farming" | "Resource Runs" | "Misc";

export interface DailyTask {
  id: string;
  label: string;
  category: DailyTaskCategory;
  notes?: string;
  /** If set, links to a full step-by-step checklist under Farm Runs. */
  farmRunId?: string;
}
