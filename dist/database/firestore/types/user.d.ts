export type GrindUser = {
    counters?: Counters;
    level?: number;
    points?: number;
    completed?: string[];
};
export type Counters = {
    listed?: number;
    listedTotalValue?: number;
    sold?: number;
    soldTotalValue?: number;
};
