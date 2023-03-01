export enum RuleCounterProperty {
  LAST_24H_BUY_COUNT = 'last24hBuyCount',
  LAST_24H_SOLD_COUNT = 'last24hSoldCount',
  LAST_24H_LISTED_FIXED_PRICE_COUNT = 'last24hListedFixedPriceCount',
  LAST_24H_LISTED_AUCTION_COUNT = 'last24hListedAuctionCount',
  LAST_24H_SWEEP_FLOOR_COUNT = 'last24hSweepFloorCount',
  LAST_24H_SELL_NOW_COUNT = 'last24hSellNowCount',
  LAST_24H_COLLECTION_OFFER_COUNT = 'last24hCollectionOfferCount',
  LAST_24H_OFFER_ON_LISTING_COUNT = 'last24hOfferOnListingCount',
  LAST_24H_BID_ON_AUCTION_COUNT = 'last24hBidOnAuctionCount',
  LAST_24H_CLAIMED_DAILY_REWARDS_COUNT = 'last24hClaimedRewardsCount',
  LAST_24H_BUY_SWAP_SPAACE_TOKEN_COUNT = 'last24hBuySwapSpaaceTokenCount',
}

// Rule with no counter
export enum RuleEventProperty {
  SALE_PRICE = 'salePrice',
  SPAACE_SWAP_PRICE = 'spaaceSwapPrice',
  VOLUME_RANKING = 'volumeRanking',
  LIFE_TIME = 'lifeTime',
}

export enum RuleOperator {
  EQ = 'eq',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  NEQ = 'neq',
}

export type Rule = {
  property?: RuleCounterProperty | RuleEventProperty;
  operator?: RuleOperator;
  value?: string;
};
