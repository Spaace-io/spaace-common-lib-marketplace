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
exports.RankChestReward = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const RankChest_entity_1 = require("./RankChest.entity");
const enums_1 = require("../enums");
let RankChestReward = class RankChestReward extends typeorm_1.BaseEntity {
};
exports.RankChestReward = RankChestReward;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RankChestReward.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], RankChestReward.prototype, "rankChestId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => RankChest_entity_1.RankChest, (c) => c.reward, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'rankChestId' }),
    __metadata("design:type", RankChest_entity_1.RankChest)
], RankChestReward.prototype, "chest", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.RankChestXpOutcome),
    (0, typeorm_1.Column)('enum', {
        enum: enums_1.RankChestXpOutcome,
        enumName: 'rank_chest_xp_outcome_enum',
    }),
    __metadata("design:type", String)
], RankChestReward.prototype, "xpOutcome", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], RankChestReward.prototype, "baseXp", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Array)
], RankChestReward.prototype, "xpValues", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], RankChestReward.prototype, "xpAmount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, scale: 2 }),
    __metadata("design:type", Number)
], RankChestReward.prototype, "multiplierValue", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('int'),
    __metadata("design:type", Number)
], RankChestReward.prototype, "multiplierDurationHours", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], RankChestReward.prototype, "startAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz' }),
    __metadata("design:type", Date)
], RankChestReward.prototype, "endAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true }),
    (0, typeorm_1.Column)('int', { nullable: true }),
    __metadata("design:type", Object)
], RankChestReward.prototype, "xpMultiplierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], RankChestReward.prototype, "createdAt", void 0);
exports.RankChestReward = RankChestReward = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'rank_chest_rewards' }),
    (0, typeorm_1.Index)(['rankChestId'], { unique: true })
], RankChestReward);
//# sourceMappingURL=RankChestReward.entity.js.map