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
exports.ArenaCrewProgress = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const ArenaSeason_entity_1 = require("./ArenaSeason.entity");
const ArenaCrew_entity_1 = require("./ArenaCrew.entity");
let ArenaCrewProgress = class ArenaCrewProgress extends typeorm_1.BaseEntity {
};
exports.ArenaCrewProgress = ArenaCrewProgress;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    (0, typeorm_1.ManyToOne)(() => ArenaCrew_entity_1.ArenaCrew),
    (0, typeorm_1.JoinColumn)({ name: 'crewName', referencedColumnName: 'name' }),
    __metadata("design:type", String)
], ArenaCrewProgress.prototype, "crewName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }),
    (0, typeorm_1.ManyToOne)(() => ArenaSeason_entity_1.ArenaSeason),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], ArenaCrewProgress.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ArenaCrewProgress.prototype, "stars", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaCrewProgress.prototype, "memberStars", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint', { default: '0' }),
    __metadata("design:type", String)
], ArenaCrewProgress.prototype, "questCompleted", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ArenaCrewProgress.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ArenaCrewProgress.prototype, "twentyFourHourRank", void 0);
exports.ArenaCrewProgress = ArenaCrewProgress = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_crew_progress' })
], ArenaCrewProgress);
//# sourceMappingURL=ArenaCrewProgress.entity.js.map