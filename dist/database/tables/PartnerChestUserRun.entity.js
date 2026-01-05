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
exports.PartnerChestUserRun = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const SpotlightCampaignRun_entity_1 = require("./SpotlightCampaignRun.entity");
const User_entity_1 = require("./User.entity");
const PartnerChestTier_entity_1 = require("./PartnerChestTier.entity");
let PartnerChestUserRun = class PartnerChestUserRun extends typeorm_1.BaseEntity {
};
exports.PartnerChestUserRun = PartnerChestUserRun;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PartnerChestUserRun.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], PartnerChestUserRun.prototype, "userAddress", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'userAddress', referencedColumnName: 'address' }),
    __metadata("design:type", User_entity_1.User)
], PartnerChestUserRun.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PartnerChestUserRun.prototype, "campaignRunId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SpotlightCampaignRun_entity_1.SpotlightCampaignRun, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'campaignRunId', referencedColumnName: 'id' }),
    __metadata("design:type", SpotlightCampaignRun_entity_1.SpotlightCampaignRun)
], PartnerChestUserRun.prototype, "campaignRun", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PartnerChestUserRun.prototype, "assignedTierId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PartnerChestTier_entity_1.PartnerChestTier, { onDelete: 'RESTRICT' }),
    (0, typeorm_1.JoinColumn)({ name: 'assignedTierId', referencedColumnName: 'id' }),
    __metadata("design:type", PartnerChestTier_entity_1.PartnerChestTier)
], PartnerChestUserRun.prototype, "assignedTier", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], PartnerChestUserRun.prototype, "assignedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, scale: 18, nullable: true }),
    __metadata("design:type", Object)
], PartnerChestUserRun.prototype, "holdingsValueEth", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, scale: 2, nullable: true }),
    __metadata("design:type", Object)
], PartnerChestUserRun.prototype, "holdingsValueUsd", void 0);
__decorate([
    (0, graphql_1.Field)(() => Object, { nullable: true }),
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], PartnerChestUserRun.prototype, "snapshot", void 0);
exports.PartnerChestUserRun = PartnerChestUserRun = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'partner_chest_user_runs' }),
    (0, typeorm_1.Unique)('uq_partner_chest_user_run', ['userAddress', 'campaignRunId']),
    (0, typeorm_1.Index)(['userAddress']),
    (0, typeorm_1.Index)(['campaignRunId'])
], PartnerChestUserRun);
//# sourceMappingURL=PartnerChestUserRun.entity.js.map