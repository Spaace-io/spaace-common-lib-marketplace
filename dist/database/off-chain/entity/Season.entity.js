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
exports.Season = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const _1 = require(".");
const class_transformer_1 = require("class-transformer");
let Season = class Season extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    __metadata("design:type", Number)
], Season.prototype, "number", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Season.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.Column)('timestamp without time zone', { nullable: true }),
    __metadata("design:type", Object)
], Season.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [_1.Quest]),
    (0, class_transformer_1.Type)(() => _1.Quest),
    __metadata("design:type", Array)
], Season.prototype, "quests", void 0);
__decorate([
    (0, graphql_1.Field)(() => [_1.SeasonRank]),
    (0, class_transformer_1.Type)(() => _1.SeasonRank),
    __metadata("design:type", Array)
], Season.prototype, "ranks", void 0);
Season = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'seasons' })
], Season);
exports.Season = Season;
//# sourceMappingURL=Season.entity.js.map