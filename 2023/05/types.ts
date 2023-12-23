export type Range = [
  destinationStart: number,
  sourceStart: number,
  length: number,
];

export type CategoryName =
  | "soil"
  | "fertilizer"
  | "water"
  | "light"
  | "temperature"
  | "humidity";

export interface Category {
  readonly source: CategoryName | "seed";
  readonly destination: CategoryName | "location";
  readonly ranges: Range[];
}

export interface Almanac {
  seeds: number[];
  categories: Category[];
}

export type SeedMap = {
  [P in `${CategoryName | "seed" | "location"}_number`]: number;
};

export type Worker05InputEvent = {
  type: "run";
  almanac: Almanac;
  seedRangeLength: number;
  seedStart: number;
};

export type Worker05OutputEvent = {
  type: "lowestLocation";
  lowestLocation: number;
};
