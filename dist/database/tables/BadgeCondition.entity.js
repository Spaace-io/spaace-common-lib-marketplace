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
exports.BadgeConditionEntity = exports.BadgeConditionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Badge_entity_1 = require("./Badge.entity");
var BadgeConditionType;
(function (BadgeConditionType) {
    // Purchase-related
    BadgeConditionType["BUY_COUNT_ON_SPAACE"] = "BUY_COUNT_ON_SPAACE";
    BadgeConditionType["BUY_DISTINCT_COLLECTIONS_ON_SPAACE"] = "BUY_DISTINCT_COLLECTIONS_ON_SPAACE";
    BadgeConditionType["BUY_SAME_COLLECTION_COUNT"] = "BUY_SAME_COLLECTION_COUNT";
    BadgeConditionType["BLUECHIP_BUY_COUNT_ON_SPAACE"] = "BLUECHIP_BUY_COUNT_ON_SPAACE";
    // Selling-related
    BadgeConditionType["SELL_COUNT_ON_SPAACE"] = "SELL_COUNT_ON_SPAACE";
    BadgeConditionType["SELL_LOSS_ON_SPAACE"] = "SELL_LOSS_ON_SPAACE";
    // Listing-related
    BadgeConditionType["LIST_COUNT_ON_SPAACE"] = "LIST_COUNT_ON_SPAACE";
    // Volume-related
    BadgeConditionType["TRADING_VOLUME_ETH"] = "TRADING_VOLUME_ETH";
    // Quest-related
    BadgeConditionType["QUEST_COMPLETED"] = "QUEST_COMPLETED";
    BadgeConditionType["QUEST_COMPLETED_COUNT"] = "QUEST_COMPLETED_COUNT";
    BadgeConditionType["DAILY_QUEST_STREAK"] = "DAILY_QUEST_STREAK";
    // Social
    BadgeConditionType["ACTIVE_REFERRALS_COUNT"] = "ACTIVE_REFERRALS_COUNT";
    // Time-based
    BadgeConditionType["CONNECTED_BEFORE_DATE"] = "CONNECTED_BEFORE_DATE";
    BadgeConditionType["ACTIVE_DURING_PERIOD"] = "ACTIVE_DURING_PERIOD";
})(BadgeConditionType || (exports.BadgeConditionType = BadgeConditionType = {}));
let BadgeConditionEntity = class BadgeConditionEntity extends typeorm_1.BaseEntity {
};
exports.BadgeConditionEntity = BadgeConditionEntity;
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Unique identifier for the condition',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BadgeConditionEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'ID of the badge this condition belongs to',
    }),
    (0, typeorm_1.Column)('uuid', { name: 'badge_id' }),
    __metadata("design:type", String)
], BadgeConditionEntity.prototype, "badgeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Type of condition (e.g., BUY_COUNT_ON_SPAACE, DAILY_QUEST_STREAK)',
    }),
    (0, typeorm_1.Column)('enum', {
        enum: BadgeConditionType,
        enumName: 'badge_condition_type',
        name: 'condition_type',
    }),
    __metadata("design:type", String)
], BadgeConditionEntity.prototype, "conditionType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Condition parameters as JSON (e.g., {"min_count": 10, "min_collections": 5})',
    }),
    (0, typeorm_1.Column)('jsonb', { default: '{}', name: 'params_json' }),
    __metadata("design:type", Object)
], BadgeConditionEntity.prototype, "paramsJson", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Logical operator for combining with other conditions (AND/OR)',
    }),
    (0, typeorm_1.Column)('varchar', { length: 10, default: 'AND', name: 'logical_operator' }),
    __metadata("design:type", String)
], BadgeConditionEntity.prototype, "logicalOperator", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Group number for complex condition logic',
    }),
    (0, typeorm_1.Column)('int', { default: 1, name: 'condition_group' }),
    __metadata("design:type", Number)
], BadgeConditionEntity.prototype, "conditionGroup", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the condition was created',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], BadgeConditionEntity.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the condition was last updated',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], BadgeConditionEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Badge_entity_1.BadgeEntity, (badge) => badge.conditions, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'badge_id' }),
    __metadata("design:type", Badge_entity_1.BadgeEntity)
], BadgeConditionEntity.prototype, "badge", void 0);
exports.BadgeConditionEntity = BadgeConditionEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'badge_conditions' }),
    (0, typeorm_1.Index)('IDX_badge_conditions_badge_id', ['badgeId']),
    (0, typeorm_1.Index)('IDX_badge_conditions_type', ['conditionType'])
], BadgeConditionEntity);
//# sourceMappingURL=BadgeCondition.entity.js.map