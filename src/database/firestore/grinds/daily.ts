import {
  Grind,
  RuleEventProperty,
  RuleOperator,
  RuleCounterProperty,
} from '../types';
import { MIN_SALE_PRICE, TOP_50_VOLUME, activityTime } from './constants';

/* DAILY GRINDS */

export const BUY_NFT: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_BUY_COUNT,
      operator: RuleOperator.LTE,
      value: '10',
    },
    MIN_SALE_PRICE,
    TOP_50_VOLUME,
  ],
  rewards: [
    {
      grindPoints: 5,
    },
  ],
};

export const SELL_NFT: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_SOLD_COUNT,
      operator: RuleOperator.LTE,
      value: '10',
    },
    MIN_SALE_PRICE,
    TOP_50_VOLUME,
  ],
  rewards: [
    {
      grindPoints: 5,
    },
  ],
};

export const LIST_FIXED_PRICE: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_LISTED_FIXED_PRICE_COUNT,
      operator: RuleOperator.LTE,
      value: '10',
    },
    MIN_SALE_PRICE,
    TOP_50_VOLUME,
    activityTime('24'),
  ],
  rewards: [
    {
      grindPoints: 3,
    },
  ],
};

export const LIST_AUCTION: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_LISTED_AUCTION_COUNT,
      operator: RuleOperator.LTE,
      value: '10',
    },
    MIN_SALE_PRICE,
    TOP_50_VOLUME,
    activityTime('24'),
  ],
  rewards: [
    {
      grindPoints: 3,
    },
  ],
};

export const USE_SWEEP_FLOOR: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_SWEEP_FLOOR_COUNT,
      operator: RuleOperator.LTE,
      value: '3',
    },
    MIN_SALE_PRICE,
    TOP_50_VOLUME,
  ],
  rewards: [
    {
      grindPoints: 5,
    },
  ],
};

export const USE_SELL_NOW: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_SELL_NOW_COUNT,
      operator: RuleOperator.LTE,
      value: '3',
    },
    MIN_SALE_PRICE,
    TOP_50_VOLUME,
  ],
  rewards: [
    {
      grindPoints: 5,
    },
  ],
};

export const USE_COLLECTION_OFFER: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_COLLECTION_OFFER_COUNT,
      operator: RuleOperator.LTE,
      value: '3',
    },
    MIN_SALE_PRICE,
    TOP_50_VOLUME,
    activityTime('24'),
  ],
};

export const MAKE_OFFER_ON_LISTING: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_OFFER_ON_LISTING_COUNT,
      operator: RuleOperator.LTE,
      value: '3',
    },
    MIN_SALE_PRICE,
    TOP_50_VOLUME,
    activityTime('24'),
  ],
  rewards: [
    {
      grindPoints: 5,
    },
  ],
};

export const MAKE_BID_ON_AUCTION: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_BID_ON_AUCTION_COUNT,
      operator: RuleOperator.LTE,
      value: '3',
    },
    MIN_SALE_PRICE,
    TOP_50_VOLUME,
    activityTime('24'),
  ],
  rewards: [
    {
      grindPoints: 5,
    },
  ],
};

export const CLAIM_DAILY_REWARDS: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_CLAIMED_DAILY_REWARDS_COUNT,
      operator: RuleOperator.LT,
      value: '1',
    },
  ],
  rewards: [
    {
      grindPoints: 2,
    },
  ],
};

export const BUY_SWAP_SPAACE_TOKEN: Grind = {
  daily: true,
  rules: [
    {
      property: RuleCounterProperty.LAST_24H_BUY_SWAP_SPAACE_TOKEN_COUNT,
      operator: RuleOperator.LT,
      value: '1',
    },
    {
      property: RuleEventProperty.SPAACE_SWAP_PRICE,
      operator: RuleOperator.GTE,
      /* 50 SPAACE TOKENS Minimum */
      value: '50',
    },
  ],
  rewards: [
    {
      grindPoints: 10,
    },
  ],
};

export const firstSeasonDailyGrinds = [
  BUY_NFT,
  SELL_NFT,
  LIST_FIXED_PRICE,
  LIST_AUCTION,
  USE_SWEEP_FLOOR,
  USE_SELL_NOW,
  USE_COLLECTION_OFFER,
  MAKE_OFFER_ON_LISTING,
  MAKE_BID_ON_AUCTION,
  CLAIM_DAILY_REWARDS,
  BUY_SWAP_SPAACE_TOKEN,
];
