import { Rule } from './rule';
export type Season = {
    name?: string;
    number?: number;
    startDate?: Date;
    grinds?: Grind[];
};
export type Grind = {
    rules?: Rule[];
    rewards?: Reward[];
    status?: 'pending' | 'done';
    infinite?: boolean;
    daily?: boolean;
    maxCall?: number;
};
export type Reward = {
    stakingBonus?: number;
    grindPoints?: number;
};
