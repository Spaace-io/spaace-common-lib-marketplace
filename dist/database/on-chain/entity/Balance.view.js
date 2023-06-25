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
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const _1 = require(".");
const __1 = require("../../..");
const class_transformer_1 = require("class-transformer");
let Balance = class Balance extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Balance.prototype, "collectionAddress", void 0);
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
                .select('"collectionAddress"')
                .addSelect('"tokenId"')
                .addSelect('"to"', 'user')
                .addSelect('SUM("amount")', 'total')
                .groupBy('"collectionAddress"')
                .addGroupBy('"tokenId"')
                .addGroupBy('"to"'), 'received')
                .leftJoin((query) => query
                .from(_1.Transfer, 'transfer')
                .select('"collectionAddress"')
                .addSelect('"tokenId"')
                .addSelect('"from"', 'user')
                .addSelect('SUM("amount")', 'total')
                .groupBy('"collectionAddress"')
                .addGroupBy('"tokenId"')
                .addGroupBy('"from"'), 'sent', '"sent"."collectionAddress" = "received"."collectionAddress" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user"')
                .select('"received"."collectionAddress"')
                .addSelect('"received"."tokenId"')
                .addSelect('"received"."user"')
                .addSelect('"received"."total" - COALESCE("sent"."total", 0)', 'balance')
                .where('"received"."total" > COALESCE("sent"."total", 0)')
                .andWhere(`"received"."user" <> '${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}'`);
        },
        name: 'balances',
    })
], Balance);
exports.Balance = Balance;
//# sourceMappingURL=Balance.view.js.map