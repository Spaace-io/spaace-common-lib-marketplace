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
exports.AirdropTierUnlocking = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const AirdropTier_entity_1 = require("./AirdropTier.entity");
const AirdropChest_entity_1 = require("./AirdropChest.entity");
const SeasonRank_entity_1 = require("./SeasonRank.entity");
let AirdropTierUnlocking = class AirdropTierUnlocking extends typeorm_1.BaseEntity {
};
exports.AirdropTierUnlocking = AirdropTierUnlocking;
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AirdropTierUnlocking.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropTier_entity_1.AirdropTier, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'tierId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropTierUnlocking.prototype, "tierId", void 0);
__decorate([
    (0, graphql_1.Field)(() => SeasonRank_entity_1.LoyaltyRank),
    (0, typeorm_1.Column)('enum', { enum: SeasonRank_entity_1.LoyaltyRank, enumName: 'rank' }),
    __metadata("design:type", String)
], AirdropTierUnlocking.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    (0, typeorm_1.ManyToOne)(() => AirdropChest_entity_1.AirdropChest, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'chestId', referencedColumnName: 'id' }),
    __metadata("design:type", Number)
], AirdropTierUnlocking.prototype, "chestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('integer'),
    __metadata("design:type", Number)
], AirdropTierUnlocking.prototype, "chestCount", void 0);
exports.AirdropTierUnlocking = AirdropTierUnlocking = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'airdrop_tiers_unlocking' })
], AirdropTierUnlocking);
//# sourceMappingURL=AirdropTierUnlocking.entity.js.map