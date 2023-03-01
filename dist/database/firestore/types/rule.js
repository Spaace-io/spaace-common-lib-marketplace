"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleOperator = exports.RuleEventProperty = exports.RuleCounterProperty = void 0;
var RuleCounterProperty;
(function (RuleCounterProperty) {
    RuleCounterProperty["LAST_24H_BUY_COUNT"] = "last24hBuyCount";
    RuleCounterProperty["LAST_24H_SOLD_COUNT"] = "last24hSoldCount";
    RuleCounterProperty["LAST_24H_LISTED_FIXED_PRICE_COUNT"] = "last24hListedFixedPriceCount";
    RuleCounterProperty["LAST_24H_LISTED_AUCTION_COUNT"] = "last24hListedAuctionCount";
    RuleCounterProperty["LAST_24H_SWEEP_FLOOR_COUNT"] = "last24hSweepFloorCount";
    RuleCounterProperty["LAST_24H_SELL_NOW_COUNT"] = "last24hSellNowCount";
    RuleCounterProperty["LAST_24H_COLLECTION_OFFER_COUNT"] = "last24hCollectionOfferCount";
    RuleCounterProperty["LAST_24H_OFFER_ON_LISTING_COUNT"] = "last24hOfferOnListingCount";
    RuleCounterProperty["LAST_24H_BID_ON_AUCTION_COUNT"] = "last24hBidOnAuctionCount";
    RuleCounterProperty["LAST_24H_CLAIMED_DAILY_REWARDS_COUNT"] = "last24hClaimedRewardsCount";
    RuleCounterProperty["LAST_24H_BUY_SWAP_SPAACE_TOKEN_COUNT"] = "last24hBuySwapSpaaceTokenCount";
})(RuleCounterProperty = exports.RuleCounterProperty || (exports.RuleCounterProperty = {}));
// Rule with no counter
var RuleEventProperty;
(function (RuleEventProperty) {
    RuleEventProperty["SALE_PRICE"] = "salePrice";
    RuleEventProperty["SPAACE_SWAP_PRICE"] = "spaaceSwapPrice";
    RuleEventProperty["VOLUME_RANKING"] = "volumeRanking";
    RuleEventProperty["LIFE_TIME"] = "lifeTime";
})(RuleEventProperty = exports.RuleEventProperty || (exports.RuleEventProperty = {}));
var RuleOperator;
(function (RuleOperator) {
    RuleOperator["EQ"] = "eq";
    RuleOperator["GT"] = "gt";
    RuleOperator["GTE"] = "gte";
    RuleOperator["LT"] = "lt";
    RuleOperator["LTE"] = "lte";
    RuleOperator["NEQ"] = "neq";
})(RuleOperator = exports.RuleOperator || (exports.RuleOperator = {}));
//# sourceMappingURL=rule.js.map