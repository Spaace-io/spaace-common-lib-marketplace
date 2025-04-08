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
exports.ArenaSeasonChest = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
const enums_1 = require("../enums");
let ChestCount = class ChestCount {
};
__decorate([
    (0, graphql_1.Field)(() => _1.ArenaChestName),
    __metadata("design:type", String)
], ChestCount.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    __metadata("design:type", Number)
], ChestCount.prototype, "count", void 0);
ChestCount = __decorate([
    (0, graphql_1.ObjectType)()
], ChestCount);
let ArenaSeasonChest = class ArenaSeasonChest extends typeorm_1.BaseEntity {
};
exports.ArenaSeasonChest = ArenaSeasonChest;
__decorate([
    (0, graphql_1.Field)(() => enums_1.ArenaDivisionName),
    (0, typeorm_1.PrimaryColumn)('enum', {
        enum: enums_1.ArenaDivisionName,
        enumName: 'arena_divison_name',
    }),
    __metadata("design:type", String)
], ArenaSeasonChest.prototype, "divisionName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], ArenaSeasonChest.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ChestCount]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    __metadata("design:type", Array)
], ArenaSeasonChest.prototype, "chestCount", void 0);
exports.ArenaSeasonChest = ArenaSeasonChest = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_seasons_chest' })
], ArenaSeasonChest);
//# sourceMappingURL=ArenaSeasonChest.entity.js.map