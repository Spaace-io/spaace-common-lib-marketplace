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
exports.ArenaUserStatistics = void 0;
const typeorm_1 = require("typeorm");
const ArenaUser_entity_1 = require("./ArenaUser.entity");
const _1 = require(".");
const graphql_1 = require("@nestjs/graphql");
let ArenaUserStatistics = class ArenaUserStatistics extends typeorm_1.BaseEntity {
};
exports.ArenaUserStatistics = ArenaUserStatistics;
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    (0, typeorm_1.ManyToOne)(() => ArenaUser_entity_1.ArenaUser),
    (0, typeorm_1.JoinColumn)({
        name: 'userTwitterId',
        referencedColumnName: 'userTwitterId',
    }),
    __metadata("design:type", String)
], ArenaUserStatistics.prototype, "userTwitterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }),
    (0, typeorm_1.ManyToOne)(() => _1.ArenaSeason),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], ArenaUserStatistics.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], ArenaUserStatistics.prototype, "totalLikes", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], ArenaUserStatistics.prototype, "totalReposts", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], ArenaUserStatistics.prototype, "totalReplies", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], ArenaUserStatistics.prototype, "totalQuotes", void 0);
exports.ArenaUserStatistics = ArenaUserStatistics = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_user_statistics' })
], ArenaUserStatistics);
//# sourceMappingURL=ArenaUserStatistics.entity.js.map