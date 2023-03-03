"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstSeasonDailyQuests = exports.BUY_SWAP_SPAACE_TOKEN = exports.CLAIM_DAILY_REWARDS = exports.MAKE_BID_ON_AUCTION = exports.MAKE_OFFER_ON_LISTING = exports.USE_COLLECTION_OFFER = exports.USE_SELL_NOW = exports.USE_SWEEP_FLOOR = exports.LIST_AUCTION = exports.LIST_FIXED_PRICE = exports.SELL_NFT = exports.BUY_NFT = void 0;
const types_1 = require("../types");
const constants_1 = require("./constants");
/* DAILY QuestS */
exports.BUY_NFT = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_BUY_COUNT,
            operator: types_1.RuleOperator.LTE,
            value: '10',
        },
        constants_1.MIN_SALE_PRICE,
        constants_1.TOP_50_VOLUME,
    ],
    rewards: [
        {
            questPoints: 5,
        },
    ],
};
exports.SELL_NFT = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_SOLD_COUNT,
            operator: types_1.RuleOperator.LTE,
            value: '10',
        },
        constants_1.MIN_SALE_PRICE,
        constants_1.TOP_50_VOLUME,
    ],
    rewards: [
        {
            questPoints: 5,
        },
    ],
};
exports.LIST_FIXED_PRICE = {
    daily: true,
    initRules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_LISTED_FIXED_PRICE_COUNT,
            operator: types_1.RuleOperator.LTE,
            value: '10',
        },
        constants_1.MIN_SALE_PRICE,
        constants_1.TOP_50_VOLUME,
    ],
    rules: [(0, constants_1.activityTime)('24')],
    rewards: [
        {
            questPoints: 3,
        },
    ],
};
exports.LIST_AUCTION = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_LISTED_AUCTION_COUNT,
            operator: types_1.RuleOperator.LTE,
            value: '10',
        },
        constants_1.MIN_SALE_PRICE,
        constants_1.TOP_50_VOLUME,
        (0, constants_1.activityTime)('24'),
    ],
    rewards: [
        {
            questPoints: 3,
        },
    ],
};
exports.USE_SWEEP_FLOOR = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_SWEEP_FLOOR_COUNT,
            operator: types_1.RuleOperator.LTE,
            value: '3',
        },
        constants_1.MIN_SALE_PRICE,
        constants_1.TOP_50_VOLUME,
    ],
    rewards: [
        {
            questPoints: 5,
        },
    ],
};
exports.USE_SELL_NOW = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_SELL_NOW_COUNT,
            operator: types_1.RuleOperator.LTE,
            value: '3',
        },
        constants_1.MIN_SALE_PRICE,
        constants_1.TOP_50_VOLUME,
    ],
    rewards: [
        {
            questPoints: 5,
        },
    ],
};
exports.USE_COLLECTION_OFFER = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_COLLECTION_OFFER_COUNT,
            operator: types_1.RuleOperator.LTE,
            value: '3',
        },
        constants_1.MIN_SALE_PRICE,
        constants_1.TOP_50_VOLUME,
        (0, constants_1.activityTime)('24'),
    ],
};
exports.MAKE_OFFER_ON_LISTING = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_OFFER_ON_LISTING_COUNT,
            operator: types_1.RuleOperator.LTE,
            value: '3',
        },
        constants_1.MIN_SALE_PRICE,
        constants_1.TOP_50_VOLUME,
        (0, constants_1.activityTime)('24'),
    ],
    rewards: [
        {
            questPoints: 5,
        },
    ],
};
exports.MAKE_BID_ON_AUCTION = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_BID_ON_AUCTION_COUNT,
            operator: types_1.RuleOperator.LTE,
            value: '3',
        },
        constants_1.MIN_SALE_PRICE,
        constants_1.TOP_50_VOLUME,
        (0, constants_1.activityTime)('24'),
    ],
    rewards: [
        {
            questPoints: 5,
        },
    ],
};
exports.CLAIM_DAILY_REWARDS = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_CLAIMED_DAILY_REWARDS_COUNT,
            operator: types_1.RuleOperator.LT,
            value: '1',
        },
    ],
    rewards: [
        {
            questPoints: 2,
        },
    ],
};
exports.BUY_SWAP_SPAACE_TOKEN = {
    daily: true,
    rules: [
        {
            property: types_1.RuleCounterProperty.LAST_24H_BUY_SWAP_SPAACE_TOKEN_COUNT,
            operator: types_1.RuleOperator.LT,
            value: '1',
        },
        {
            property: types_1.RuleEventProperty.SPAACE_SWAP_PRICE,
            operator: types_1.RuleOperator.GTE,
            /* 50 SPAACE TOKENS Minimum */
            value: '50',
        },
    ],
    rewards: [
        {
            questPoints: 10,
        },
    ],
};
exports.firstSeasonDailyQuests = [
    exports.BUY_NFT,
    exports.SELL_NFT,
    exports.LIST_FIXED_PRICE,
    exports.LIST_AUCTION,
    exports.USE_SWEEP_FLOOR,
    exports.USE_SELL_NOW,
    exports.USE_COLLECTION_OFFER,
    exports.MAKE_OFFER_ON_LISTING,
    exports.MAKE_BID_ON_AUCTION,
    exports.CLAIM_DAILY_REWARDS,
    exports.BUY_SWAP_SPAACE_TOKEN,
];
//# sourceMappingURL=daily.js.map