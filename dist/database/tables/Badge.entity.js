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
exports.BadgeEntity = exports.BadgeRarity = exports.BadgeCategory = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const BadgeCondition_entity_1 = require("./BadgeCondition.entity");
const UserBadge_entity_1 = require("./UserBadge.entity");
var BadgeCategory;
(function (BadgeCategory) {
    BadgeCategory["COLLECTOR"] = "collector";
    BadgeCategory["TRADING"] = "trading";
    BadgeCategory["ACTIVITY"] = "activity";
    BadgeCategory["SOCIAL"] = "social";
    BadgeCategory["LOYALTY"] = "loyalty";
})(BadgeCategory || (exports.BadgeCategory = BadgeCategory = {}));
var BadgeRarity;
(function (BadgeRarity) {
    BadgeRarity["COMMON"] = "common";
    BadgeRarity["RARE"] = "rare";
    BadgeRarity["EPIC"] = "epic";
    BadgeRarity["LEGENDARY"] = "legendary";
})(BadgeRarity || (exports.BadgeRarity = BadgeRarity = {}));
let BadgeEntity = class BadgeEntity extends typeorm_1.BaseEntity {
};
exports.BadgeEntity = BadgeEntity;
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Unique identifier for the badge',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BadgeEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Unique badge code (e.g., "OG", "COLLECTOR")',
    }),
    (0, typeorm_1.Column)('varchar', { length: 100, unique: true }),
    __metadata("design:type", String)
], BadgeEntity.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Badge category: collector, trading, activity, social, loyalty',
    }),
    (0, typeorm_1.Column)('enum', { enum: BadgeCategory, enumName: 'badge_category' }),
    __metadata("design:type", String)
], BadgeEntity.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Display name of the badge (visible only when unlocked/claimed)',
    }),
    (0, typeorm_1.Column)('varchar', { length: 255 }),
    __metadata("design:type", String)
], BadgeEntity.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: 'Badge description (visible only when unlocked/claimed)',
    }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], BadgeEntity.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        nullable: true,
        description: 'URL to the badge icon image',
    }),
    (0, typeorm_1.Column)('text', { nullable: true, name: 'icon_url' }),
    __metadata("design:type", Object)
], BadgeEntity.prototype, "iconUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        description: 'Whether the badge is currently active and can be earned',
    }),
    (0, typeorm_1.Column)('boolean', { default: true, name: 'is_active' }),
    __metadata("design:type", Boolean)
], BadgeEntity.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, {
        description: 'Whether the badge can be earned multiple times',
    }),
    (0, typeorm_1.Column)('boolean', { default: false, name: 'is_repeatable' }),
    __metadata("design:type", Boolean)
], BadgeEntity.prototype, "isRepeatable", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        nullable: true,
        description: 'Maximum number of times the badge can be earned (null = unlimited)',
    }),
    (0, typeorm_1.Column)('int', {
        nullable: true,
        name: 'max_count',
        default: 1,
    }),
    __metadata("design:type", Object)
], BadgeEntity.prototype, "maxCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Display order in badge lists',
    }),
    (0, typeorm_1.Column)('int', { default: 0, name: 'sort_order' }),
    __metadata("design:type", Number)
], BadgeEntity.prototype, "sortOrder", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Badge rarity: common, rare, epic, legendary',
    }),
    (0, typeorm_1.Column)('enum', {
        enum: BadgeRarity,
        enumName: 'badge_rarity',
        default: BadgeRarity.COMMON,
    }),
    __metadata("design:type", String)
], BadgeEntity.prototype, "rarity", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the badge was created',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], BadgeEntity.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the badge was last updated',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], BadgeEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => BadgeCondition_entity_1.BadgeConditionEntity, (condition) => condition.badge),
    __metadata("design:type", Array)
], BadgeEntity.prototype, "conditions", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserBadge_entity_1.UserBadgeEntity, (userBadge) => userBadge.badge),
    __metadata("design:type", Array)
], BadgeEntity.prototype, "userBadges", void 0);
exports.BadgeEntity = BadgeEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'badges' }),
    (0, typeorm_1.Index)('IDX_badges_code', ['code']),
    (0, typeorm_1.Index)('IDX_badges_active_category', ['isActive', 'category'])
], BadgeEntity);
//# sourceMappingURL=Badge.entity.js.map