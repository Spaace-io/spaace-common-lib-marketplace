"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = exports.Rank = exports.Quest = exports.QuestPeriod = exports.QuestStep = exports.QuestRule = exports.QuestRuleOperator = exports.CosmeticQuestReward = exports.SpaaceTokensQuestReward = exports.StakingBonusQuestReward = exports.LoyaltyPointsQuestReward = exports.QuestRewardType = exports.QuestTrigger = void 0;
var QuestTrigger;
(function (QuestTrigger) {
    QuestTrigger["SALE"] = "Sale";
    QuestTrigger["ORDER"] = "Order";
    QuestTrigger["UNISWAP"] = "Uniswap";
    QuestTrigger["STAKING_REWARD"] = "StakingReward";
    QuestTrigger["TRADING_REWARD"] = "TradingReward";
    QuestTrigger["QUEST"] = "Quest";
    QuestTrigger["REFERRAL"] = "Referral";
    QuestTrigger["CART_ITEM"] = "CartItem";
    QuestTrigger["TWITTER_POST"] = "TwitterPost";
    QuestTrigger["TWITTER_LIKE"] = "TwitterLike";
    QuestTrigger["TWITTER_RT"] = "TwitterRT";
    QuestTrigger["CRON"] = "Cron";
})(QuestTrigger = exports.QuestTrigger || (exports.QuestTrigger = {}));
var QuestRewardType;
(function (QuestRewardType) {
    QuestRewardType["LOYALTY_POINTS"] = "LoyaltyPoints";
    QuestRewardType["STAKING_BONUS"] = "StakingBonus";
    QuestRewardType["SPAACE_TOKENS"] = "SpaaceTokens";
    QuestRewardType["COSMETIC"] = "Cosmetic";
})(QuestRewardType = exports.QuestRewardType || (exports.QuestRewardType = {}));
class LoyaltyPointsQuestReward {
    constructor() {
        this.type = QuestRewardType.LOYALTY_POINTS;
    }
}
exports.LoyaltyPointsQuestReward = LoyaltyPointsQuestReward;
class StakingBonusQuestReward {
    constructor() {
        this.type = QuestRewardType.STAKING_BONUS;
    }
}
exports.StakingBonusQuestReward = StakingBonusQuestReward;
class SpaaceTokensQuestReward {
    constructor() {
        this.type = QuestRewardType.SPAACE_TOKENS;
    }
}
exports.SpaaceTokensQuestReward = SpaaceTokensQuestReward;
class CosmeticQuestReward {
    constructor() {
        this.type = QuestRewardType.COSMETIC;
    }
}
exports.CosmeticQuestReward = CosmeticQuestReward;
var QuestRuleOperator;
(function (QuestRuleOperator) {
    QuestRuleOperator["EQ"] = "=";
    QuestRuleOperator["GT"] = ">";
    QuestRuleOperator["GTE"] = ">=";
    QuestRuleOperator["LT"] = "<";
    QuestRuleOperator["LTE"] = "<=";
    QuestRuleOperator["NEQ"] = "!=";
})(QuestRuleOperator = exports.QuestRuleOperator || (exports.QuestRuleOperator = {}));
class QuestRule {
}
exports.QuestRule = QuestRule;
class QuestStep {
}
exports.QuestStep = QuestStep;
var QuestPeriod;
(function (QuestPeriod) {
    QuestPeriod["DAILY"] = "day";
    QuestPeriod["SEASONAL"] = "season";
})(QuestPeriod = exports.QuestPeriod || (exports.QuestPeriod = {}));
class Quest {
}
exports.Quest = Quest;
class Rank {
}
exports.Rank = Rank;
class Season {
}
exports.Season = Season;
//# sourceMappingURL=Season.entity.js.map