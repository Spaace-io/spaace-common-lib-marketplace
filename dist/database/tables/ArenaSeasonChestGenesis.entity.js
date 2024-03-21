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
exports.ArenaSeasonChestGenesis = exports.ArenaTiers = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
var ArenaTiers;
(function (ArenaTiers) {
    ArenaTiers["TIER_1"] = "1";
    ArenaTiers["TIER_2"] = "2";
    ArenaTiers["TIER_3"] = "3";
    ArenaTiers["TIER_4"] = "4";
    ArenaTiers["TIER_5"] = "5";
})(ArenaTiers = exports.ArenaTiers || (exports.ArenaTiers = {}));
(0, graphql_1.registerEnumType)(ArenaTiers, { name: 'ArenaTiers' });
let Tier = class Tier {
};
__decorate([
    (0, graphql_1.Field)(() => ArenaTiers),
    __metadata("design:type", String)
], Tier.prototype, "tierNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], Tier.prototype, "probability", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], Tier.prototype, "coefficient", void 0);
Tier = __decorate([
    (0, graphql_1.ObjectType)()
], Tier);
let ArenaSeasonChestGenesis = class ArenaSeasonChestGenesis extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ArenaSeasonChestGenesis.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaSeasonChestGenesis.prototype, "minChestCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaSeasonChestGenesis.prototype, "maxChestCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Tier]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    __metadata("design:type", Array)
], ArenaSeasonChestGenesis.prototype, "tiers", void 0);
ArenaSeasonChestGenesis = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_seasons_chest_genesis' }),
    (0, typeorm_1.Unique)(['minChestCount', 'maxChestCount'])
], ArenaSeasonChestGenesis);
exports.ArenaSeasonChestGenesis = ArenaSeasonChestGenesis;
//# sourceMappingURL=ArenaSeasonChestGenesis.entity.js.map