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
exports.ArenaLeague = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
const class_validator_1 = require("class-validator");
let ArenaLeague = class ArenaLeague extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }),
    (0, typeorm_1.ManyToOne)(() => _1.ArenaSeason),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], ArenaLeague.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => _1.ArenaDivisionName),
    (0, typeorm_1.PrimaryColumn)('enum', {
        enum: _1.ArenaDivisionName,
        enumName: 'arena_divison_name',
    }),
    (0, typeorm_1.ManyToOne)(() => _1.ArenaDivision),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'divisionName', referencedColumnName: 'name' },
    ]),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", String)
], ArenaLeague.prototype, "divisionName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], ArenaLeague.prototype, "leagueNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric'),
    __metadata("design:type", String)
], ArenaLeague.prototype, "numberOfUsers", void 0);
ArenaLeague = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_leagues' })
], ArenaLeague);
exports.ArenaLeague = ArenaLeague;
//# sourceMappingURL=ArenaLeague.entity.js.map