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
exports.BadgeUnlockHistoryEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const Badge_entity_1 = require("./Badge.entity");
const User_entity_1 = require("./User.entity");
let BadgeUnlockHistoryEntity = class BadgeUnlockHistoryEntity extends typeorm_1.BaseEntity {
};
exports.BadgeUnlockHistoryEntity = BadgeUnlockHistoryEntity;
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Unique identifier for the history record',
    }),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BadgeUnlockHistoryEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'User wallet address who unlocked the badge',
    }),
    (0, typeorm_1.Column)('varchar', { length: 42, name: 'user_address' }),
    __metadata("design:type", String)
], BadgeUnlockHistoryEntity.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Badge ID that was unlocked',
    }),
    (0, typeorm_1.Column)('uuid', { name: 'badge_id' }),
    __metadata("design:type", String)
], BadgeUnlockHistoryEntity.prototype, "badgeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the badge was unlocked',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', { name: 'unlocked_at' }),
    __metadata("design:type", Date)
], BadgeUnlockHistoryEntity.prototype, "unlockedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, {
        description: 'When the record was created',
    }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        default: () => 'CURRENT_TIMESTAMP',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], BadgeUnlockHistoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'user_address', referencedColumnName: 'address' }),
    __metadata("design:type", User_entity_1.User)
], BadgeUnlockHistoryEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Badge_entity_1.BadgeEntity, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'badge_id' }),
    __metadata("design:type", Badge_entity_1.BadgeEntity)
], BadgeUnlockHistoryEntity.prototype, "badge", void 0);
exports.BadgeUnlockHistoryEntity = BadgeUnlockHistoryEntity = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'badge_unlock_history' }),
    (0, typeorm_1.Index)('IDX_badge_unlock_history_user', ['userAddress', 'createdAt']),
    (0, typeorm_1.Index)('IDX_badge_unlock_history_badge', ['badgeId', 'createdAt'])
], BadgeUnlockHistoryEntity);
//# sourceMappingURL=BadgeUnlockHistory.entity.js.map