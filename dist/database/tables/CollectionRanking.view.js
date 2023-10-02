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
exports.CollectionRanking = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const __1 = require("../..");
const _1 = require(".");
const types_1 = require("../types");
function getVolumeQuery(interval, previous = false) {
    return (query) => {
        let subQuery = query
            .subQuery()
            .from(_1.SaleEntity, 'sale')
            .select('SUM("sale"."price")')
            .where('"sale"."collectionAddress" = "collection"."address"')
            .andWhere(`"sale"."currency" IN ('${__1.utils
            .strip0x(__1.utils.constants.ETH_TOKENS)
            .join("','")}')`);
        if (previous) {
            subQuery = subQuery
                .andWhere(`"sale"."timestamp" > NOW() - (INTERVAL '${interval}' * 2)`)
                .andWhere(`"sale"."timestamp" <= NOW() - INTERVAL '${interval}'`);
        }
        else {
            subQuery = subQuery.andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`);
        }
        return query.fromDummy().select(`COALESCE(${subQuery.getQuery()}, 0)`);
    };
}
function getFloorPriceQuery(timestamp) {
    return (query) => {
        query = query
            .from(types_1.Order, 'order')
            .select(`MIN(CASE WHEN "order"."type" = '${_1.OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM ${timestamp !== null && timestamp !== void 0 ? timestamp : 'NOW()'} - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END)`)
            .where(`"order"."type" IN ('${_1.OrderType.ASK}', '${_1.OrderType.DUTCH_AUCTION}')`)
            .andWhere('"order"."collectionAddress" = "collection"."address"')
            .andWhere(`"order"."currency" IN ('${__1.utils
            .strip0x(__1.utils.constants.ETH_TOKENS)
            .join("','")}')`);
        if (timestamp === undefined) {
            query = query.andWhere('"order"."active"');
        }
        else {
            // Equivalent of "order"."active" but at timestamp instead of NOW()
            query = query
                .andWhere(`"order"."startTime" <= ${timestamp}`)
                .andWhere(new typeorm_1.Brackets((query) => query
                .where(`"order"."endTime" > ${timestamp}`)
                .orWhere('"order"."endTime" IS NULL')))
                .andWhere('"order"."cancelTimestamp" IS NULL')
                .andWhere(`NOT EXISTS ${query
                .subQuery()
                .from(_1.SaleEntity, 'sale')
                .where('"sale"."orderHash" = "order"."hash"')
                .getQuery()}`)
                .andWhere(`"order"."currency" IN ('${__1.utils
                .strip0x(__1.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhereExists(query
                .subQuery()
                .select('"balance"."balance"')
                .from(_1.BalanceEntity, 'balance')
                .where('"balance"."userAddress" = "order"."userAddress"')
                .andWhere('"balance"."collectionAddress" = "order"."collectionAddress"')
                .andWhere('"balance"."tokenId" = "order"."tokenId"')
                .andWhere('"balance"."balance" > 0'));
        }
        return query;
    };
}
function getSaleCountQuery(interval) {
    return (query) => query
        .from(_1.SaleEntity, 'sale')
        .select('COUNT(*)')
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils
        .strip0x(__1.utils.constants.ETH_TOKENS)
        .join("','")}')`)
        .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`);
}
let CollectionRanking = class CollectionRanking extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "floorPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "floorChange1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "floorChange6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "floorChange24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "floorChange7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "floorChange30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "saleCount1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "saleCount6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "saleCount24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "saleCount7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "saleCount30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "saleCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "totalSupply", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "ownerCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "listedCount", void 0);
CollectionRanking = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from((q) => q
                .from(_1.CollectionEntity, 'collection')
                .select('"collection"."address"')
                .addSelect((query) => query
                .from(_1.SaleEntity, 'sale')
                .select('SUM("sale"."price")')
                .where('"sale"."collectionAddress" = "collection"."address"')
                .andWhere(`"sale"."currency" IN ('${__1.utils
                .strip0x(__1.utils.constants.ETH_TOKENS)
                .join("','")}')`), 'volume')
                .addSelect(getVolumeQuery('1 hour'), 'volume1h')
                .addSelect(getVolumeQuery('6 hours'), 'volume6h')
                .addSelect(getVolumeQuery('1 day'), 'volume24h')
                .addSelect(getVolumeQuery('7 days'), 'volume7d')
                .addSelect(getVolumeQuery('30 days'), 'volume30d')
                .addSelect(getVolumeQuery('1 hour', true), 'volumePrevious1h')
                .addSelect(getVolumeQuery('6 hours', true), 'volumePrevious6h')
                .addSelect(getVolumeQuery('1 day', true), 'volumePrevious24h')
                .addSelect(getVolumeQuery('7 days', true), 'volumePrevious7d')
                .addSelect(getVolumeQuery('30 days', true), 'volumePrevious30d')
                .addSelect(getFloorPriceQuery(), 'floorPrice')
                .addSelect(getFloorPriceQuery("NOW() - INTERVAL '1 hour'"), 'floorPrevious1h')
                .addSelect(getFloorPriceQuery("NOW() - INTERVAL '6 hours'"), 'floorPrevious6h')
                .addSelect(getFloorPriceQuery("NOW() - INTERVAL '1 day'"), 'floorPrevious24h')
                .addSelect(getFloorPriceQuery("NOW() - INTERVAL '7 days'"), 'floorPrevious7d')
                .addSelect(getFloorPriceQuery("NOW() - INTERVAL '30 days'"), 'floorPrevious30d')
                .addSelect((query) => query
                .from(_1.SaleEntity, 'sale')
                .select('COUNT(*)')
                .where('"sale"."collectionAddress" = "collection"."address"')
                .andWhere(`"sale"."currency" IN ('${__1.utils
                .strip0x(__1.utils.constants.ETH_TOKENS)
                .join("','")}')`), 'saleCount')
                .addSelect(getSaleCountQuery('1 hour'), 'saleCount1h')
                .addSelect(getSaleCountQuery('6 hours'), 'saleCount6h')
                .addSelect(getSaleCountQuery('1 day'), 'saleCount24h')
                .addSelect(getSaleCountQuery('7 days'), 'saleCount7d')
                .addSelect(getSaleCountQuery('30 days'), 'saleCount30d')
                .addSelect((query) => query
                .from(_1.BalanceEntity, 'balance')
                .select('SUM("balance"."balance")')
                .where('"balance"."collectionAddress" = "collection"."address"')
                .andWhere('"balance"."balance" > 0'), 'totalSupply')
                .addSelect((query) => query
                .from(_1.BalanceEntity, 'balance')
                .select('COUNT(DISTINCT "balance"."userAddress")')
                .where('"balance"."collectionAddress" = "collection"."address"')
                .andWhere('"balance"."balance" > 0'), 'ownerCount')
                .addSelect((query) => query
                .from(types_1.Order, 'order')
                .select('COUNT(DISTINCT "order"."tokenId")')
                .where(`"order"."type" != '${_1.OrderType.BID}'`)
                .andWhere('"order"."collectionAddress" = "collection"."address"')
                .andWhere('"order"."active"'), 'listedCount'), 'collection')
                .select('*')
                .addSelect('"volume1h" - "volumePrevious1h"', 'volumeChange1h')
                .addSelect('"volume6h" - "volumePrevious6h"', 'volumeChange6h')
                .addSelect('"volume24h" - "volumePrevious24h"', 'volumeChange24h')
                .addSelect('"volume7d" - "volumePrevious7d"', 'volumeChange7d')
                .addSelect('"volume30d" - "volumePrevious30d"', 'volumeChange30d')
                .addSelect('"floorPrice" - "floorPrevious1h"', 'floorChange1h')
                .addSelect('"floorPrice" - "floorPrevious6h"', 'floorChange6h')
                .addSelect('"floorPrice" - "floorPrevious24h"', 'floorChange24h')
                .addSelect('"floorPrice" - "floorPrevious7d"', 'floorChange7d')
                .addSelect('"floorPrice" - "floorPrevious30d"', 'floorChange30d');
        },
        name: 'collection_rankings',
        materialized: true,
    }),
    (0, typeorm_1.Index)(['address'], { unique: true }),
    (0, typeorm_1.Index)(['volume']),
    (0, typeorm_1.Index)(['volume1h']),
    (0, typeorm_1.Index)(['volume6h']),
    (0, typeorm_1.Index)(['volume24h']),
    (0, typeorm_1.Index)(['volume7d']),
    (0, typeorm_1.Index)(['volume30d']),
    (0, typeorm_1.Index)(['volumeChange1h']),
    (0, typeorm_1.Index)(['volumeChange6h']),
    (0, typeorm_1.Index)(['volumeChange24h']),
    (0, typeorm_1.Index)(['volumeChange7d']),
    (0, typeorm_1.Index)(['volumeChange30d']),
    (0, typeorm_1.Index)(['floorPrice']),
    (0, typeorm_1.Index)(['floorChange1h']),
    (0, typeorm_1.Index)(['floorChange6h']),
    (0, typeorm_1.Index)(['floorChange24h']),
    (0, typeorm_1.Index)(['floorChange7d']),
    (0, typeorm_1.Index)(['floorChange30d'])
], CollectionRanking);
exports.CollectionRanking = CollectionRanking;
//# sourceMappingURL=CollectionRanking.view.js.map