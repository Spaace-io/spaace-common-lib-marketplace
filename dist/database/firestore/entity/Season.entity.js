"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Season = exports.Rank = exports.Quest = exports.QuestPeriod = exports.QuestStep = exports.QuestRule = exports.QuestRuleOperator = exports.QuestReward = exports.CosmeticQuestReward = exports.SpaaceTokensQuestReward = exports.StakingBonusQuestReward = exports.LoyaltyPointsQuestReward = exports.QuestTrigger = void 0;
const graphql_1 = require("@nestjs/graphql");
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
(0, graphql_1.registerEnumType)(QuestTrigger, {
    name: 'QuestTrigger',
});
let LoyaltyPointsQuestReward = class LoyaltyPointsQuestReward {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], LoyaltyPointsQuestReward.prototype, "amount", void 0);
LoyaltyPointsQuestReward = __decorate([
    (0, graphql_1.ObjectType)()
], LoyaltyPointsQuestReward);
exports.LoyaltyPointsQuestReward = LoyaltyPointsQuestReward;
let StakingBonusQuestReward = class StakingBonusQuestReward {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], StakingBonusQuestReward.prototype, "amount", void 0);
StakingBonusQuestReward = __decorate([
    (0, graphql_1.ObjectType)()
], StakingBonusQuestReward);
exports.StakingBonusQuestReward = StakingBonusQuestReward;
let SpaaceTokensQuestReward = class SpaaceTokensQuestReward {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SpaaceTokensQuestReward.prototype, "amount", void 0);
SpaaceTokensQuestReward = __decorate([
    (0, graphql_1.ObjectType)()
], SpaaceTokensQuestReward);
exports.SpaaceTokensQuestReward = SpaaceTokensQuestReward;
let CosmeticQuestReward = class CosmeticQuestReward {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], CosmeticQuestReward.prototype, "id", void 0);
CosmeticQuestReward = __decorate([
    (0, graphql_1.ObjectType)()
], CosmeticQuestReward);
exports.CosmeticQuestReward = CosmeticQuestReward;
exports.QuestReward = (0, graphql_1.createUnionType)({
    name: 'QuestReward',
    types: () => [
        LoyaltyPointsQuestReward,
        StakingBonusQuestReward,
        SpaaceTokensQuestReward,
        CosmeticQuestReward,
    ],
});
var QuestRuleOperator;
(function (QuestRuleOperator) {
    QuestRuleOperator["EQ"] = "=";
    QuestRuleOperator["GT"] = ">";
    QuestRuleOperator["GTE"] = ">=";
    QuestRuleOperator["LT"] = "<";
    QuestRuleOperator["LTE"] = "<=";
    QuestRuleOperator["NEQ"] = "!=";
})(QuestRuleOperator = exports.QuestRuleOperator || (exports.QuestRuleOperator = {}));
(0, graphql_1.registerEnumType)(QuestRuleOperator, {
    name: 'QuestRuleOperator',
});
let QuestRule = class QuestRule {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], QuestRule.prototype, "property", void 0);
__decorate([
    (0, graphql_1.Field)(() => QuestRuleOperator),
    __metadata("design:type", String)
], QuestRule.prototype, "operator", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], QuestRule.prototype, "value", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], QuestRule.prototype, "delta", void 0);
QuestRule = __decorate([
    (0, graphql_1.ObjectType)()
], QuestRule);
exports.QuestRule = QuestRule;
let QuestStep = class QuestStep {
};
__decorate([
    (0, graphql_1.Field)(() => QuestTrigger),
    __metadata("design:type", String)
], QuestStep.prototype, "trigger", void 0);
__decorate([
    (0, graphql_1.Field)(() => [QuestRule]),
    __metadata("design:type", Array)
], QuestStep.prototype, "rules", void 0);
QuestStep = __decorate([
    (0, graphql_1.ObjectType)()
], QuestStep);
exports.QuestStep = QuestStep;
var QuestPeriod;
(function (QuestPeriod) {
    QuestPeriod["DAILY"] = "day";
    QuestPeriod["SEASONAL"] = "season";
})(QuestPeriod = exports.QuestPeriod || (exports.QuestPeriod = {}));
(0, graphql_1.registerEnumType)(QuestPeriod, {
    name: 'QuestPeriod',
});
let Quest = class Quest {
};
__decorate([
    (0, graphql_1.Field)(() => [QuestStep]),
    __metadata("design:type", Array)
], Quest.prototype, "steps", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exports.QuestReward]),
    __metadata("design:type", Array)
], Quest.prototype, "rewards", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    __metadata("design:type", Object)
], Quest.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => QuestPeriod, { nullable: true }),
    __metadata("design:type", Object)
], Quest.prototype, "period", void 0);
Quest = __decorate([
    (0, graphql_1.ObjectType)()
], Quest);
exports.Quest = Quest;
let Rank = class Rank {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], Rank.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Rank.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Rank.prototype, "loyaltyPointsThreshold", void 0);
__decorate([
    (0, graphql_1.Field)(() => [exports.QuestReward]),
    __metadata("design:type", Array)
], Rank.prototype, "rewards", void 0);
Rank = __decorate([
    (0, graphql_1.ObjectType)()
], Rank);
exports.Rank = Rank;
let Season = class Season {
};
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], Season.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Season.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Object)
], Season.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Quest]),
    __metadata("design:type", Array)
], Season.prototype, "quests", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Rank]),
    __metadata("design:type", Array)
], Season.prototype, "ranks", void 0);
Season = __decorate([
    (0, graphql_1.ObjectType)()
], Season);
exports.Season = Season;
//# sourceMappingURL=Season.entity.js.map