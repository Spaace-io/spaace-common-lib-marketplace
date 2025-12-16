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
exports.SpotlightCampaign = exports.SpotlightHistoryEntry = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const Quest_entity_1 = require("./Quest.entity");
let SpotlightHistoryEntry = class SpotlightHistoryEntry {
};
exports.SpotlightHistoryEntry = SpotlightHistoryEntry;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SpotlightHistoryEntry.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SpotlightHistoryEntry.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SpotlightHistoryEntry.prototype, "validFrom", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], SpotlightHistoryEntry.prototype, "validTo", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    __metadata("design:type", Object)
], SpotlightHistoryEntry.prototype, "deactivatedManually", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], SpotlightHistoryEntry.prototype, "deactivatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], SpotlightHistoryEntry.prototype, "note", void 0);
exports.SpotlightHistoryEntry = SpotlightHistoryEntry = __decorate([
    (0, graphql_1.ObjectType)()
], SpotlightHistoryEntry);
let SpotlightCampaign = class SpotlightCampaign extends typeorm_1.BaseEntity {
};
exports.SpotlightCampaign = SpotlightCampaign;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SpotlightCampaign.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('char', { length: 40 }),
    __metadata("design:type", String)
], SpotlightCampaign.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], SpotlightCampaign.prototype, "collectionName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], SpotlightCampaign.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], SpotlightCampaign.prototype, "questId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Quest_entity_1.Quest),
    (0, typeorm_1.ManyToOne)(() => Quest_entity_1.Quest),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'questId', referencedColumnName: 'id' },
    ]),
    __metadata("design:type", Quest_entity_1.Quest)
], SpotlightCampaign.prototype, "quest", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], SpotlightCampaign.prototype, "validFrom", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone'),
    __metadata("design:type", Date)
], SpotlightCampaign.prototype, "validTo", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], SpotlightCampaign.prototype, "active", void 0);
__decorate([
    (0, graphql_1.Field)(() => [SpotlightHistoryEntry]),
    (0, typeorm_1.Column)('jsonb', { default: () => "'[]'::jsonb" }),
    __metadata("design:type", Array)
], SpotlightCampaign.prototype, "metadata", void 0);
exports.SpotlightCampaign = SpotlightCampaign = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'spotlight_campaigns' })
], SpotlightCampaign);
//# sourceMappingURL=SpotlightCampaign.entity.js.map