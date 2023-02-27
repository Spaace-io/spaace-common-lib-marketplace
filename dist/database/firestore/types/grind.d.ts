import { Rule } from './rule';
export type Season = {
    name?: string;
    number?: number;
    startDate?: Date;
    grinds?: Grind[];
};
export type Grind = {
    rule?: Rule;
    rewards?: Reward[];
};
export type Reward = {
    stakingBonus?: number;
};
