export interface LoadoutItem {
  item: string;
  note?: string;
  optional?: boolean;
}

export interface FarmRunStep {
  id: string;
  /** Location name, e.g. "Falador" */
  location: string;
  /** Ordered micro-steps to perform at this location. */
  actions: string[];
}

export interface FarmRunPreset {
  id: string;
  name: string;
  shortName: string;
  description: string;
  estimatedTime: string;
  requirements?: string[];
  loadout: LoadoutItem[];
  steps: FarmRunStep[];
  sourceUrl: string;
}
