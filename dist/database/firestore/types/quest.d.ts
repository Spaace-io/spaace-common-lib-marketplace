import { Rule } from './rule';
export type Season = {
    name?: string;
    number?: number;
    startDate?: Date;
    quests?: Quest[];
};
export type Quest = {
    initRules?: Rule[];
    rules?: Rule[];
    rewards?: Reward[];
    infinite?: boolean;
    daily?: boolean;
    maxCall?: number;
};
export type Reward = {
    stakingBonus?: number;
    questPoints?: number;
};
