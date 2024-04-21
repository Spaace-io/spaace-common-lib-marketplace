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
exports.ArenaCrewChestPoint = exports.ArenaCrewChestTiers = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
var ArenaCrewChestTiers;
(function (ArenaCrewChestTiers) {
    ArenaCrewChestTiers["TIER_1"] = "1";
    ArenaCrewChestTiers["TIER_2"] = "2";
    ArenaCrewChestTiers["TIER_3"] = "3";
})(ArenaCrewChestTiers = exports.ArenaCrewChestTiers || (exports.ArenaCrewChestTiers = {}));
(0, graphql_1.registerEnumType)(ArenaCrewChestTiers, { name: 'ArenaCrewChestTiers' });
let XpTier = class XpTier {
};
__decorate([
    (0, graphql_1.Field)(() => ArenaCrewChestTiers),
    __metadata("design:type", String)
], XpTier.prototype, "tierNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], XpTier.prototype, "xp", void 0);
XpTier = __decorate([
    (0, graphql_1.ObjectType)()
], XpTier);
let ArenaCrewChestPoint = class ArenaCrewChestPoint extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ArenaCrewChestPoint.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaCrewChestPoint.prototype, "minRank", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaCrewChestPoint.prototype, "maxRank", void 0);
__decorate([
    (0, graphql_1.Field)(() => [XpTier]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    __metadata("design:type", Array)
], ArenaCrewChestPoint.prototype, "tiers", void 0);
ArenaCrewChestPoint = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_crew_chest_points' }),
    (0, typeorm_1.Unique)(['minRank', 'maxRank'])
], ArenaCrewChestPoint);
exports.ArenaCrewChestPoint = ArenaCrewChestPoint;
//# sourceMappingURL=ArenaCrewChestPoints.entity.js.map