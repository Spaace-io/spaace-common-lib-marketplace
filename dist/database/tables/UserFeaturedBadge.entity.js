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
exports.UserFeaturedBadgeEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Badge_entity_1 = require("./Badge.entity");
const User_entity_1 = require("./User.entity");
let UserFeaturedBadgeEntity = class UserFeaturedBadgeEntity extends typeorm_1.BaseEntity {
};
exports.UserFeaturedBadgeEntity = UserFeaturedBadgeEntity;
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Unique identifier for the user featured badge record',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], UserFeaturedBadgeEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'User wallet address',
    }),
    (0, typeorm_1.Column)('varchar', { length: 42, name: 'user_address' }),
    __metadata("design:type", String)
], UserFeaturedBadgeEntity.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, {
        description: 'Display position on user profile (1 = first, 2 = second, etc.)',
    }),
    (0, typeorm_1.Column)('int', { default: 0, name: 'position' }),
    __metadata("design:type", Number)
], UserFeaturedBadgeEntity.prototype, "position", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Badge ID to display at this position',
    }),
    (0, typeorm_1.Column)('uuid', { name: 'badge_id' }),
    __metadata("design:type", String)
], UserFeaturedBadgeEntity.prototype, "badgeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the featured badge was last updated',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        default: () => 'CURRENT_TIMESTAMP',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], UserFeaturedBadgeEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_address', referencedColumnName: 'address' }),
    __metadata("design:type", User_entity_1.User)
], UserFeaturedBadgeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Badge_entity_1.BadgeEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'badge_id' }),
    __metadata("design:type", Badge_entity_1.BadgeEntity)
], UserFeaturedBadgeEntity.prototype, "badge", void 0);
exports.UserFeaturedBadgeEntity = UserFeaturedBadgeEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'user_featured_badges' }),
    (0, typeorm_1.Index)('IDX_user_featured_badges_user_position', ['userAddress', 'position']),
    (0, typeorm_1.Index)('IDX_user_featured_badges_user_badge', ['userAddress', 'badgeId'], {
        unique: true,
    })
], UserFeaturedBadgeEntity);
//# sourceMappingURL=UserFeaturedBadge.entity.js.map