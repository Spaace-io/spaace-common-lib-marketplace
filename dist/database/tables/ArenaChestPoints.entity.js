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
exports.ArenaChestPoints = exports.ArenaChestName = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
var ArenaChestName;
(function (ArenaChestName) {
    ArenaChestName["MYTIC"] = "MYTIC";
    ArenaChestName["LEGENDARY"] = "LEGENDARY";
    ArenaChestName["RARE"] = "RARE";
    ArenaChestName["UNCOMMON"] = "UNCOMMON";
    ArenaChestName["COMMON"] = "COMMON";
    ArenaChestName["GENESIS"] = "GENESIS";
    ArenaChestName["CREW"] = "CREW";
    ArenaChestName["REFERRAL"] = "REFERRAL";
})(ArenaChestName = exports.ArenaChestName || (exports.ArenaChestName = {}));
(0, graphql_1.registerEnumType)(ArenaChestName, { name: 'ArenaChestName' });
let ArenaChestPoints = class ArenaChestPoints extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => ArenaChestName),
    (0, typeorm_1.PrimaryColumn)('enum', {
        enum: ArenaChestName,
        enumName: 'arena_chest_name',
    }),
    __metadata("design:type", String)
], ArenaChestPoints.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaChestPoints.prototype, "xp", void 0);
ArenaChestPoints = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_chest_points' })
], ArenaChestPoints);
exports.ArenaChestPoints = ArenaChestPoints;
//# sourceMappingURL=ArenaChestPoints.entity.js.map