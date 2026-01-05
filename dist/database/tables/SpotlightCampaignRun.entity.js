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
exports.SpotlightCampaignRun = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const SpotlightCampaign_entity_1 = require("./SpotlightCampaign.entity");
let SpotlightCampaignRun = class SpotlightCampaignRun extends typeorm_1.BaseEntity {
};
exports.SpotlightCampaignRun = SpotlightCampaignRun;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SpotlightCampaignRun.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], SpotlightCampaignRun.prototype, "campaignId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SpotlightCampaign_entity_1.SpotlightCampaign, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'campaignId', referencedColumnName: 'id' }),
    __metadata("design:type", SpotlightCampaign_entity_1.SpotlightCampaign)
], SpotlightCampaignRun.prototype, "campaign", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], SpotlightCampaignRun.prototype, "validFrom", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], SpotlightCampaignRun.prototype, "validTo", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], SpotlightCampaignRun.prototype, "isCurrent", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)({ type: 'timestamptz', default: () => 'NOW()' }),
    __metadata("design:type", Date)
], SpotlightCampaignRun.prototype, "createdAt", void 0);
exports.SpotlightCampaignRun = SpotlightCampaignRun = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'spotlight_campaign_runs' })
], SpotlightCampaignRun);
//# sourceMappingURL=SpotlightCampaignRun.entity.js.map