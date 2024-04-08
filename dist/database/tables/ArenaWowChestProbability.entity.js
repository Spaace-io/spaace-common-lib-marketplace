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
exports.ArenaWowChestProbability = exports.ArenaWowChestType = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
var ArenaWowChestType;
(function (ArenaWowChestType) {
    ArenaWowChestType["XP"] = "XP";
    ArenaWowChestType["TOKEN"] = "TOKEN";
    ArenaWowChestType["BOOSTER"] = "BOOSTER";
})(ArenaWowChestType = exports.ArenaWowChestType || (exports.ArenaWowChestType = {}));
(0, graphql_1.registerEnumType)(ArenaWowChestType, { name: 'ArenaWowChestType' });
let ArenaWowChestProbability = class ArenaWowChestProbability extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ArenaWowChestProbability.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => ArenaWowChestType),
    (0, typeorm_1.Column)('enum', {
        enum: ArenaWowChestType,
        enumName: 'arena_wow_chest_type',
    }),
    __metadata("design:type", String)
], ArenaWowChestProbability.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaWowChestProbability.prototype, "value", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaWowChestProbability.prototype, "probability", void 0);
ArenaWowChestProbability = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_wow_chest_probability' })
], ArenaWowChestProbability);
exports.ArenaWowChestProbability = ArenaWowChestProbability;
//# sourceMappingURL=ArenaWowChestProbability.entity.js.map