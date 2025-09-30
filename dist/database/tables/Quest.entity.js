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
exports.Quest = exports.QuestPeriod = exports.QuestStep = exports.QuestRule = exports.QuestRuleOperator = exports.QuestTrigger = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const _1 = require(".");
const class_validator_1 = require("class-validator");
const QuestType_enum_1 = require("../enums/QuestType.enum");
const enums_1 = require("../enums");
var QuestTrigger;
(function (QuestTrigger) {
    QuestTrigger["TOKEN_TRANSFER"] = "TOKEN_TRANSFER";
    QuestTrigger["UNISWAP"] = "UNISWAP";
    QuestTrigger["TRANSFER"] = "TRANSFER";
    QuestTrigger["SALE"] = "SALE";
    QuestTrigger["ORDER"] = "ORDER";
    QuestTrigger["USER"] = "USER";
    QuestTrigger["STAKING_DEPOSIT"] = "STAKING_DEPOSIT";
    QuestTrigger["DISTRIBUTOR_REWARD"] = "DISTRIBUTOR_REWARD";
    QuestTrigger["USER_QUEST_PROGRESS"] = "USER_QUEST_PROGRESS";
    QuestTrigger["REFERRAL"] = "REFERRAL";
    QuestTrigger["CART_ITEM"] = "CART_ITEM";
    QuestTrigger["USER_INTERACTION"] = "USER_INTERACTION";
    QuestTrigger["DATA_COMPILED"] = "DATA_COMPILED";
    QuestTrigger["QUEST_COMPLETED"] = "QUEST_COMPLETED";
    QuestTrigger["REFERRER"] = "REFERRER";
})(QuestTrigger || (exports.QuestTrigger = QuestTrigger = {}));
(0, graphql_1.registerEnumType)(QuestTrigger, {
    name: 'QuestTrigger',
});
var QuestRuleOperator;
(function (QuestRuleOperator) {
    QuestRuleOperator["EQ"] = "EQ";
    QuestRuleOperator["GT"] = "GT";
    QuestRuleOperator["GTE"] = "GTE";
    QuestRuleOperator["LT"] = "LT";
    QuestRuleOperator["LTE"] = "LTE";
    QuestRuleOperator["NEQ"] = "NEQ";
})(QuestRuleOperator || (exports.QuestRuleOperator = QuestRuleOperator = {}));
(0, graphql_1.registerEnumType)(QuestRuleOperator, {
    name: 'QuestRuleOperator',
});
let QuestRule = class QuestRule {
};
exports.QuestRule = QuestRule;
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
exports.QuestRule = QuestRule = __decorate([
    (0, graphql_1.ObjectType)()
], QuestRule);
let QuestStep = class QuestStep {
};
exports.QuestStep = QuestStep;
__decorate([
    (0, graphql_1.Field)(() => QuestTrigger),
    __metadata("design:type", String)
], QuestStep.prototype, "trigger", void 0);
__decorate([
    (0, graphql_1.Field)(() => [QuestRule]),
    (0, class_transformer_1.Type)(() => QuestRule),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], QuestStep.prototype, "rules", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], QuestStep.prototype, "cron", void 0);
exports.QuestStep = QuestStep = __decorate([
    (0, graphql_1.ObjectType)()
], QuestStep);
var QuestPeriod;
(function (QuestPeriod) {
    QuestPeriod["DAILY"] = "DAILY";
    QuestPeriod["SEASONAL"] = "SEASONAL";
    QuestPeriod["FOREVER"] = "FOREVER";
})(QuestPeriod || (exports.QuestPeriod = QuestPeriod = {}));
(0, graphql_1.registerEnumType)(QuestPeriod, {
    name: 'QuestPeriod',
});
let Quest = class Quest extends typeorm_1.BaseEntity {
};
exports.Quest = Quest;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.Season),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], Quest.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Quest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Quest.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    (0, typeorm_1.OneToOne)(() => Quest),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'previousQuestId', referencedColumnName: 'id' },
    ]),
    __metadata("design:type", Object)
], Quest.prototype, "previousQuestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], Quest.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Quest.prototype, "prime", void 0);
__decorate([
    (0, graphql_1.Field)(() => [QuestStep]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    (0, class_transformer_1.Type)(() => QuestStep),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], Quest.prototype, "steps", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Quest.prototype, "loyaltyPoints", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Quest.prototype, "boost", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], Quest.prototype, "boostLimit", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '1' }),
    __metadata("design:type", String)
], Quest.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => QuestPeriod),
    (0, typeorm_1.Column)('enum', { enum: QuestPeriod, enumName: 'quest_period' }),
    __metadata("design:type", String)
], Quest.prototype, "period", void 0);
__decorate([
    (0, graphql_1.Field)(() => _1.LoyaltyRank),
    (0, typeorm_1.Column)('enum', {
        enum: _1.LoyaltyRank,
        enumName: 'loyalty_rank',
        default: _1.LoyaltyRank.BRONZE_5,
    }),
    __metadata("design:type", String)
], Quest.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => QuestType_enum_1.QuestType),
    (0, typeorm_1.Column)('enum', { enum: QuestType_enum_1.QuestType, enumName: 'quest_type' }),
    (0, class_validator_1.IsEnum)(QuestType_enum_1.QuestType, {
        message: 'type must be one of the following: GENESIS, PRIME, DAILY, PROGRESSIVE',
    }),
    __metadata("design:type", String)
], Quest.prototype, "questType", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], Quest.prototype, "featured", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], Quest.prototype, "tweetId", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.TweetAction, { nullable: true }),
    (0, typeorm_1.Column)('enum', {
        enum: enums_1.TweetAction,
        enumName: 'tweet_action',
        nullable: true,
    }),
    __metadata("design:type", Object)
], Quest.prototype, "tweetAction", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], Quest.prototype, "order", void 0);
exports.Quest = Quest = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'quests' }),
    (0, typeorm_1.Unique)(['seasonNumber', 'name'])
], Quest);
//# sourceMappingURL=Quest.entity.js.map