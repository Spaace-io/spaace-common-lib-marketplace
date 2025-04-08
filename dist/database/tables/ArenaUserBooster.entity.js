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
exports.ArenaUserBooster = exports.ArenaUserBoosterType = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
var ArenaUserBoosterType;
(function (ArenaUserBoosterType) {
    ArenaUserBoosterType["SPECIAL"] = "SPECIAL";
    ArenaUserBoosterType["WOW_CHEST"] = "WOW_CHEST";
})(ArenaUserBoosterType || (exports.ArenaUserBoosterType = ArenaUserBoosterType = {}));
(0, graphql_1.registerEnumType)(ArenaUserBoosterType, {
    name: 'ArenaUserBoosterType',
});
let ArenaUserBooster = class ArenaUserBooster extends typeorm_1.BaseEntity {
};
exports.ArenaUserBooster = ArenaUserBooster;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ArenaUserBooster.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    (0, typeorm_1.ManyToOne)(() => _1.ArenaUser),
    (0, typeorm_1.JoinColumn)({ name: 'userTwitterId', referencedColumnName: 'userTwitterId' }),
    __metadata("design:type", String)
], ArenaUserBooster.prototype, "userTwitterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.ArenaSeason),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], ArenaUserBooster.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ArenaUserBooster.prototype, "expiresOn", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", Number)
], ArenaUserBooster.prototype, "booster", void 0);
__decorate([
    (0, graphql_1.Field)(() => ArenaUserBoosterType),
    (0, typeorm_1.Column)('enum', { enum: ArenaUserBoosterType, enumName: 'booster_type' }),
    __metadata("design:type", String)
], ArenaUserBooster.prototype, "type", void 0);
exports.ArenaUserBooster = ArenaUserBooster = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_users_booster' }),
    (0, typeorm_1.Index)(['userTwitterId', 'seasonNumber', 'expiresOn'])
], ArenaUserBooster);
//# sourceMappingURL=ArenaUserBooster.entity.js.map