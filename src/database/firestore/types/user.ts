export type GrindUser = {
  counters?: Counters;
  level?: number;
  points?: number;
  completed?: string[]; // Grind keys
};

export type Counters = {
  last24hBuyCount?: number;

  last24hSoldCount?: number;

  last24hListedFixedPriceCount?: number;

  last24hListedAuctionCount?: number;

  last24hSweepFloorCount?: number;

  last24hSellNowCount?: number;

  last24hCollectionOfferCount?: number;

  last24hOfferOnListingCount?: number;

  last24hBidOnAuctionCount?: number;

  // TODO: Can probably be a boolean
  last24hClaimedRewardsCount?: number;

  // TODO: Can probably be a boolean
  last24hBuySwapSpaaceTokenCount?: number;
};
