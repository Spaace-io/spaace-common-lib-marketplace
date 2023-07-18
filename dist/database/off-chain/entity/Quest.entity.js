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
var Quest_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quest = exports.QuestPeriod = exports.QuestStep = exports.QuestRule = exports.QuestRuleOperator = exports.QuestTrigger = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const _1 = require(".");
var QuestTrigger;
(function (QuestTrigger) {
    QuestTrigger["SALE"] = "Sale";
    QuestTrigger["TRANSFER"] = "Transfer";
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
    (0, class_transformer_1.Type)(() => QuestRule),
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
let Quest = Quest_1 = class Quest extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.Season),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", Number)
], Quest.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Quest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    (0, typeorm_1.OneToOne)(() => Quest_1),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'previousQuestId', referencedColumnName: 'id' },
    ]),
    __metadata("design:type", Object)
], Quest.prototype, "previousQuestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Quest.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Quest.prototype, "prime", void 0);
__decorate([
    (0, graphql_1.Field)(() => [QuestStep]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    (0, class_transformer_1.Type)(() => QuestStep),
    __metadata("design:type", Array)
], Quest.prototype, "steps", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], Quest.prototype, "loyaltyPoints", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '1' }),
    __metadata("design:type", Number)
], Quest.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => QuestPeriod),
    (0, typeorm_1.Column)('enum', { enum: QuestPeriod, enumName: 'quest_period' }),
    __metadata("design:type", String)
], Quest.prototype, "period", void 0);
__decorate([
    (0, graphql_1.Field)(() => Quest_1, { nullable: true }),
    (0, class_transformer_1.Type)(() => Quest_1),
    __metadata("design:type", Object)
], Quest.prototype, "previousQuest", void 0);
__decorate([
    (0, graphql_1.Field)(() => Quest_1, { nullable: true }),
    (0, class_transformer_1.Type)(() => Quest_1),
    __metadata("design:type", Object)
], Quest.prototype, "nextQuest", void 0);
__decorate([
    (0, graphql_1.Field)(() => [_1.UserQuestProgress], { nullable: true }),
    (0, class_transformer_1.Type)(() => _1.UserQuestProgress),
    __metadata("design:type", Object)
], Quest.prototype, "progress", void 0);
Quest = Quest_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'quests' })
], Quest);
exports.Quest = Quest;
//# sourceMappingURL=Quest.entity.js.map