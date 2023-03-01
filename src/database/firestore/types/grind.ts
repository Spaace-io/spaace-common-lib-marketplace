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
  // Used to track grinds that need a validation from blocklistener.
  // Pending means that the grind was started by the user but needs to be validated by blocklistener.
  status?: 'pending' | 'done';
  infinite?: boolean;
  daily?: boolean;
  maxCall?: number;
};

export type Reward = {
  stakingBonus?: number;
  grindPoints?: number;
};
