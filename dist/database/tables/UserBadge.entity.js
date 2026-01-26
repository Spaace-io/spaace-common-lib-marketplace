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
exports.UserBadgeEntity = exports.BadgeStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Badge_entity_1 = require("./Badge.entity");
const User_entity_1 = require("./User.entity");
var BadgeStatus;
(function (BadgeStatus) {
    BadgeStatus["LOCKED"] = "LOCKED";
    BadgeStatus["UNLOCKED"] = "UNLOCKED";
    BadgeStatus["CLAIMED"] = "CLAIMED";
})(BadgeStatus || (exports.BadgeStatus = BadgeStatus = {}));
let UserBadgeEntity = class UserBadgeEntity extends typeorm_1.BaseEntity {
};
exports.UserBadgeEntity = UserBadgeEntity;
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Unique identifier for the user badge record',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserBadgeEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'User wallet address',
    }),
    (0, typeorm_1.Column)('varchar', { length: 42, name: 'user_address' }),
    __metadata("design:type", String)
], UserBadgeEntity.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Badge ID',
    }),
    (0, typeorm_1.Column)('uuid', { name: 'badge_id' }),
    __metadata("design:type", String)
], UserBadgeEntity.prototype, "badgeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Badge status: LOCKED (not eligible), UNLOCKED (can claim), CLAIMED (claimed)',
    }),
    (0, typeorm_1.Column)('enum', {
        enum: BadgeStatus,
        enumName: 'badge_status',
        default: BadgeStatus.LOCKED,
    }),
    __metadata("design:type", String)
], UserBadgeEntity.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Number of times this badge has been earned (for repeatable badges)',
    }),
    (0, typeorm_1.Column)('int', { default: 0 }),
    __metadata("design:type", Number)
], UserBadgeEntity.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: 'When the badge was unlocked',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true, name: 'unlocked_at' }),
    __metadata("design:type", Object)
], UserBadgeEntity.prototype, "unlockedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: 'When the user claimed the badge and saw the animation',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', { nullable: true, name: 'claimed_at' }),
    __metadata("design:type", Object)
], UserBadgeEntity.prototype, "claimedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: 'When eligibility was last checked',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        nullable: true,
        name: 'last_evaluated_at',
    }),
    __metadata("design:type", Object)
], UserBadgeEntity.prototype, "lastEvaluatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        nullable: true,
        description: 'When to check eligibility next (for optimization)',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        nullable: true,
        name: 'next_evaluation_at',
    }),
    __metadata("design:type", Object)
], UserBadgeEntity.prototype, "nextEvaluationAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the user badge record was created',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], UserBadgeEntity.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the user badge record was last updated',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], UserBadgeEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_address', referencedColumnName: 'address' }),
    __metadata("design:type", User_entity_1.User)
], UserBadgeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Badge_entity_1.BadgeEntity, (badge) => badge.userBadges, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'badge_id' }),
    __metadata("design:type", Badge_entity_1.BadgeEntity)
], UserBadgeEntity.prototype, "badge", void 0);
exports.UserBadgeEntity = UserBadgeEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'user_badges' }),
    (0, typeorm_1.Index)('IDX_user_badges_user_status', ['userAddress', 'status']),
    (0, typeorm_1.Index)('IDX_user_badges_unlocked_at', ['unlockedAt']),
    (0, typeorm_1.Index)('IDX_user_badges_next_eval', ['nextEvaluationAt']),
    (0, typeorm_1.Index)('UQ_user_badges_user_badge', ['userAddress', 'badgeId'], {
        unique: true,
    })
], UserBadgeEntity);
//# sourceMappingURL=UserBadge.entity.js.map