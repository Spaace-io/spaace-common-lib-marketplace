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
exports.CollectionBalance = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
let CollectionBalance = class CollectionBalance extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], CollectionBalance.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], CollectionBalance.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionBalance.prototype, "balance", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionBalance.prototype, "itemCount", void 0);
CollectionBalance = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return (dataSource
                .createQueryBuilder()
                .from((q) => q
                .subQuery()
                .from(__1.BalanceEntity, 'balance')
                .select('"balance"."collectionAddress"', 'collectionAddress')
                .addSelect('"balance"."userAddress"', 'userAddress')
                .addSelect('SUM("balance"."balance")', 'balance')
                .addSelect('COUNT(DISTINCT "balance"."tokenId")', 'itemCount')
                .where('"balance"."balance" > 0')
                .groupBy('"balance"."collectionAddress"')
                .addGroupBy('"balance"."userAddress"'), 'balance')
                .leftJoin((qb) => qb
                .from('sales_volume_10y', 'sales')
                .select('"collectionAddress"')
                .addSelect('SUM("volume")', 'volume')
                .addSelect('SUM("saleCount")', 'saleCount')
                .groupBy('"collectionAddress"'), 'sales_volume', '"sales_volume"."collectionAddress" = "balance"."collectionAddress"')
                .leftJoin((qb) => qb
                .from('sales', 'sales')
                .select('"collectionAddress"')
                .addSelect('SUM("perUnitPrice")', 'volume1h')
                .addSelect('SUM("amount")', 'saleCount1h')
                .where('"timestamp" >= NOW() - INTERVAL \'1 hour\'')
                .groupBy('"collectionAddress"'), 'sales_volume_1h', '"sales_volume_1h"."collectionAddress" = "balance"."collectionAddress"')
                .leftJoin((qb) => qb
                .from('sales', 'sales_volume_6h')
                .select('"collectionAddress"')
                .addSelect('SUM("perUnitPrice")', 'volume6h')
                .addSelect('SUM("amount")', 'saleCount6h')
                .where('"timestamp" >= NOW() - INTERVAL \'6 hour\'')
                .groupBy('"collectionAddress"'), 'sales_volume_6h', '"sales_volume_6h"."collectionAddress" = "balance"."collectionAddress"')
                .leftJoin((qb) => qb
                .from('sales_volume_1d', 'sales_volume_1d')
                .select('"collectionAddress"')
                .addSelect('"volume"', 'volume24h')
                .addSelect('"saleCount"', 'saleCount24h')
                .where('"bucket_1d" >= NOW() - INTERVAL \'1 day\''), 'sales_volume_1d', '"sales_volume_1d"."collectionAddress" = "balance"."collectionAddress"')
                .leftJoin((qb) => qb
                .from('sales_volume_1d', 'sales_volume_7d')
                .select('"collectionAddress"')
                .addSelect('SUM("volume")', 'volume7d')
                .addSelect('SUM("saleCount")', 'saleCount7d')
                .where('"bucket_1d" >= NOW() - INTERVAL \'7 day\'')
                .groupBy('"collectionAddress"'), 'sales_volume_7d', '"sales_volume_7d"."collectionAddress" = "balance"."collectionAddress"')
                .leftJoin((qb) => qb
                .from('sales_volume_1d', 'sales_volume_30d')
                .select('"collectionAddress"')
                .addSelect('SUM("volume")', 'volume30d')
                .addSelect('SUM("saleCount")', 'saleCount30d')
                .where('"bucket_1d" >= NOW() - INTERVAL \'30 day\'')
                .groupBy('"collectionAddress"'), 'sales_volume_30d', '"sales_volume_30d"."collectionAddress" = "balance"."collectionAddress"')
                .leftJoin((qb) => qb
                .from('sales_volume_90d', 'sales_volume_90d')
                .select('"collectionAddress"')
                .addSelect('"volume"', 'volume90d')
                .addSelect('"saleCount"', 'saleCount90d')
                .where('"bucket_90d" >= NOW() - INTERVAL \'90 day\''), 'sales_volume_90d', '"sales_volume_90d"."collectionAddress" = "balance"."collectionAddress"')
                .select('"balance"."collectionAddress"', 'collectionAddress')
                .addSelect('"balance"."userAddress"', 'userAddress')
                .addSelect('"balance"."balance"', 'balance')
                .addSelect('"balance"."itemCount"', 'itemCount')
                // Used for searching
                .addSelect((q) => q
                .from(__1.CollectionEntity, 'collection')
                .select('"collection"."description"')
                .where('"balance"."collectionAddress" = "balance"."collectionAddress"'), 'description')
                .addSelect((q) => q
                .from(__1.CollectionEntity, 'collection')
                .select('"collection"."name"')
                .where('"balance"."collectionAddress" = "balance"."collectionAddress"'), 'name')
                // Used for sorting/filtering, but not included in the GraphQL output
                .addSelect('COALESCE(sales_volume."volume", 0)', 'volume')
                .addSelect('COALESCE(sales_volume_1h."volume1h", 0)', 'volume1h')
                .addSelect('COALESCE(sales_volume_1h."saleCount1h", 0)', 'saleCount1h')
                .addSelect('COALESCE(sales_volume_6h."volume6h", 0)', 'volume6h')
                .addSelect('COALESCE(sales_volume_6h."saleCount6h", 0)', 'saleCount6h')
                .addSelect('COALESCE(sales_volume_1d."volume24h", 0)', 'volume24h')
                .addSelect('COALESCE(sales_volume_1d."saleCount24h", 0)', 'saleCount24h')
                .addSelect('COALESCE(sales_volume_7d."volume7d", 0)', 'volume7d')
                .addSelect('COALESCE(sales_volume_7d."saleCount7d", 0)', 'saleCount7d')
                .addSelect('COALESCE(sales_volume_30d."volume30d", 0)', 'volume30d')
                .addSelect('COALESCE(sales_volume_30d."saleCount30d", 0)', 'saleCount30d')
                .addSelect('COALESCE(sales_volume_90d."volume90d", 0)', 'volume90d')
                .addSelect('COALESCE(sales_volume_90d."saleCount90d", 0)', 'saleCount90d'));
        },
        name: 'collection_balances_view',
    })
], CollectionBalance);
exports.CollectionBalance = CollectionBalance;
//# sourceMappingURL=CollectionBalance.view.js.map