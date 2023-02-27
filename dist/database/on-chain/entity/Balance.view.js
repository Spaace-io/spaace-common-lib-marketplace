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
exports.Balance = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Balance = class Balance extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Balance.prototype, "collection", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Balance.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Balance.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Balance.prototype, "balance", void 0);
__decorate([
    (0, graphql_1.Field)(() => _1.Item),
    __metadata("design:type", _1.Item)
], Balance.prototype, "item", void 0);
Balance = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        materialized: true,
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from((query) => query
                .from(_1.Transfer, 'transfer')
                .select('"collection"')
                .addSelect('"tokenId"')
                .addSelect('"to"', 'user')
                .addSelect('SUM("amount")', 'total')
                .groupBy('"collection"')
                .addGroupBy('"tokenId"')
                .addGroupBy('"to"'), 'sent')
                .leftJoin((query) => query
                .from(_1.Transfer, 'transfer')
                .select('"collection"')
                .addSelect('"tokenId"')
                .addSelect('"from"', 'user')
                .addSelect('SUM("amount")', 'total')
                .groupBy('"collection"')
                .addGroupBy('"tokenId"')
                .addGroupBy('"from"'), 'received', '"sent"."collection" = "received"."collection" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user"')
                .select('"received"."collection"')
                .addSelect('"received"."tokenId"')
                .addSelect('"received"."user"')
                .addSelect('"received"."total" - COALESCE("sent"."total", 0)', 'balance')
                .where('"received"."total" > COALESCE("sent"."total", 0)');
        },
        name: 'balances',
    })
], Balance);
exports.Balance = Balance;
//# sourceMappingURL=Balance.view.js.map