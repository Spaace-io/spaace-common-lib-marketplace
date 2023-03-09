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

export const defaultUser: GrindUser = {
  points: 0,
  level: 1,
};

export const defaultCounters: Counters = {
  last24hBuyCount: 0,
  last24hSoldCount: 0,
  last24hListedFixedPriceCount: 0,
  last24hListedAuctionCount: 0,
  last24hSweepFloorCount: 0,
  last24hSellNowCount: 0,
  last24hCollectionOfferCount: 0,
  last24hOfferOnListingCount: 0,
  last24hBidOnAuctionCount: 0,
  last24hClaimedRewardsCount: 0,
  last24hBuySwapSpaaceTokenCount: 0,
};
