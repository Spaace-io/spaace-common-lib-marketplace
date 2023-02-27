export type GrindUser = {
  counters?: Counters;
  level?: number;
  points?: number;
  completed?: string[]; // Grind keys
};

export type Counters = {
  listed?: number;
  listedTotalValue?: number;

  sold?: number;
  soldTotalValue?: number;
};
