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
exports.SellVolume = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let SellVolume = class SellVolume extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], SellVolume.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], SellVolume.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], SellVolume.prototype, "volume", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], SellVolume.prototype, "date", void 0);
SellVolume = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        materialized: true,
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(_1.Sale, 'sale')
                .select('"from"', 'user')
                .addSelect('"currency"')
                .addSelect('DATE_TRUNC(\'day\', "timestamp")::DATE', 'date')
                .addSelect('SUM("price")', 'volume')
                .groupBy('"from"')
                .addGroupBy('"currency"')
                .addGroupBy('"date"');
        },
        name: 'sell_volumes',
    })
], SellVolume);
exports.SellVolume = SellVolume;
//# sourceMappingURL=SellVolume.view.js.map