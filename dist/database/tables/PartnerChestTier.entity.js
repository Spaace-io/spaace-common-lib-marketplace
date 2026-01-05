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
exports.PartnerChestTier = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const SpotlightCampaignRun_entity_1 = require("./SpotlightCampaignRun.entity");
let PartnerChestTier = class PartnerChestTier extends typeorm_1.BaseEntity {
};
exports.PartnerChestTier = PartnerChestTier;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PartnerChestTier.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PartnerChestTier.prototype, "campaignRunId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SpotlightCampaignRun_entity_1.SpotlightCampaignRun, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'campaignRunId', referencedColumnName: 'id' }),
    __metadata("design:type", SpotlightCampaignRun_entity_1.SpotlightCampaignRun)
], PartnerChestTier.prototype, "campaignRun", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.Column)('smallint'),
    __metadata("design:type", Number)
], PartnerChestTier.prototype, "tierNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, scale: 18, default: '0' }),
    __metadata("design:type", String)
], PartnerChestTier.prototype, "thresholdEth", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], PartnerChestTier.prototype, "label", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], PartnerChestTier.prototype, "active", void 0);
exports.PartnerChestTier = PartnerChestTier = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'partner_chest_tiers' }),
    (0, typeorm_1.Unique)('uq_partner_chest_tier_run_number', ['campaignRunId', 'tierNumber'])
], PartnerChestTier);
//# sourceMappingURL=PartnerChestTier.entity.js.map