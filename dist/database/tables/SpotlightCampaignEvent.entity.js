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
exports.SpotlightCampaignEvent = exports.SpotlightCampaignEventType = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
var SpotlightCampaignEventType;
(function (SpotlightCampaignEventType) {
    SpotlightCampaignEventType["NEW_RUN"] = "NEW_RUN";
    SpotlightCampaignEventType["ACTIVATE"] = "ACTIVATE";
    SpotlightCampaignEventType["DEACTIVATE"] = "DEACTIVATE";
    SpotlightCampaignEventType["UPDATE_CAMPAIGN"] = "UPDATE_CAMPAIGN";
    SpotlightCampaignEventType["UPDATE_RUN"] = "UPDATE_RUN";
})(SpotlightCampaignEventType || (exports.SpotlightCampaignEventType = SpotlightCampaignEventType = {}));
(0, graphql_1.registerEnumType)(SpotlightCampaignEventType, {
    name: 'SpotlightCampaignEventType',
});
let SpotlightCampaignEvent = class SpotlightCampaignEvent extends typeorm_1.BaseEntity {
};
exports.SpotlightCampaignEvent = SpotlightCampaignEvent;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SpotlightCampaignEvent.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], SpotlightCampaignEvent.prototype, "campaignId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    __metadata("design:type", Object)
], SpotlightCampaignEvent.prototype, "runId", void 0);
__decorate([
    (0, graphql_1.Field)(() => SpotlightCampaignEventType),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: SpotlightCampaignEventType,
        enumName: 'spotlight_campaign_event_type_enum',
    }),
    __metadata("design:type", String)
], SpotlightCampaignEvent.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], SpotlightCampaignEvent.prototype, "note", void 0);
__decorate([
    (0, graphql_1.Field)(() => Object),
    (0, typeorm_1.Column)('jsonb', { default: () => "'{}'::jsonb" }),
    __metadata("design:type", Object)
], SpotlightCampaignEvent.prototype, "payload", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamptz', { default: () => 'NOW()' }),
    __metadata("design:type", Date)
], SpotlightCampaignEvent.prototype, "createdAt", void 0);
exports.SpotlightCampaignEvent = SpotlightCampaignEvent = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'spotlight_campaign_events' })
], SpotlightCampaignEvent);
//# sourceMappingURL=SpotlightCampaignEvent.entity.js.map