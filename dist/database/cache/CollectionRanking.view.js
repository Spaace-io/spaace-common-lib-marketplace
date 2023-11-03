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
exports.CollectionRankingCached = void 0;
const typeorm_1 = require("typeorm");
const __1 = require("../..");
const __2 = require("..");
function getVolumeQuery(interval, previous = false) {
    return (query) => {
        let subQuery = query
            .subQuery()
            .from(__2.SaleEntity, 'sale')
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
            .from(__2.Order, 'order')
            .select(`MIN(CASE WHEN "order"."type" = '${__2.OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM ${timestamp !== null && timestamp !== void 0 ? timestamp : 'NOW()'} - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END)`)
            .where(`"order"."type" IN ('${__2.OrderType.ASK}', '${__2.OrderType.DUTCH_AUCTION}')`)
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
                .from(__2.SaleEntity, 'sale')
                .where('"sale"."orderHash" = "order"."hash"')
                .getQuery()}`)
                .andWhere(`"order"."currency" IN ('${__1.utils
                .strip0x(__1.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhereExists(query
                .subQuery()
                .select('"balance"."balance"')
                .from(__2.BalanceEntity, 'balance')
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
        .from(__2.SaleEntity, 'sale')
        .select('COUNT(*)')
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils
        .strip0x(__1.utils.constants.ETH_TOKENS)
        .join("','")}')`)
        .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`);
}
let CollectionRankingCached = class CollectionRankingCached extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.ViewColumn)(),
    (0, typeorm_1.ManyToOne)(() => __2.CollectionEntity),
    (0, typeorm_1.JoinColumn)({ name: 'address', referencedColumnName: 'address' }),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume1h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume6h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume24h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume7d", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volume30d", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange1h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange6h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange24h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange7d", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "volumeChange30d", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorPrice", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange1h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange6h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange24h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange7d", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "floorChange30d", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount1h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount6h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount24h", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount7d", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount30d", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "saleCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "totalSupply", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "ownerCount", void 0);
__decorate([
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRankingCached.prototype, "listedCount", void 0);
CollectionRankingCached = __decorate([
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from((query) => query
                .from(__2.CollectionEntity, 'collection')
                .select('"collection"."address"', 'address')
                .addSelect((query) => query
                .from(__2.SaleEntity, 'sale')
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
                .from(__2.SaleEntity, 'sale')
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
                .from(__2.BalanceEntity, 'balance')
                .select('SUM("balance"."balance")')
                .where('"balance"."collectionAddress" = "collection"."address"')
                .andWhere('"balance"."balance" > 0'), 'totalSupply')
                .addSelect((query) => query
                .from(__2.BalanceEntity, 'balance')
                .select('COUNT(DISTINCT "balance"."userAddress")')
                .where('"balance"."collectionAddress" = "collection"."address"')
                .andWhere('"balance"."balance" > 0'), 'ownerCount')
                .addSelect((query) => query
                .from(__2.ActiveOrderCached, 'order')
                .select('COUNT(DISTINCT "order"."tokenId")') // TODO: ERC1155 support
                .where(`"order"."type" != '${__2.OrderType.BID}'`)
                .andWhere('"order"."collectionAddress" = "collection"."address"'), 'listedCount'), 'collection')
                .select('"collection"."address"', 'address')
                .addSelect('"collection"."volume"', 'volume')
                .addSelect('"collection"."volume1h"', 'volume1h')
                .addSelect('"collection"."volume6h"', 'volume6h')
                .addSelect('"collection"."volume24h"', 'volume24h')
                .addSelect('"collection"."volume7d"', 'volume7d')
                .addSelect('"collection"."volume30d"', 'volume30d')
                .addSelect('"collection"."volume1h" - "collection"."volumePrevious1h"', 'volumeChange1h')
                .addSelect('"collection"."volume6h" - "collection"."volumePrevious6h"', 'volumeChange6h')
                .addSelect('"collection"."volume24h" - "collection"."volumePrevious24h"', 'volumeChange24h')
                .addSelect('"collection"."volume7d" - "collection"."volumePrevious7d"', 'volumeChange7d')
                .addSelect('"collection"."volume30d" - "collection"."volumePrevious30d"', 'volumeChange30d')
                .addSelect('"collection"."floorPrice"', 'floorPrice')
                .addSelect('"collection"."floorPrice" - "collection"."floorPrevious1h"', 'floorChange1h')
                .addSelect('"collection"."floorPrice" - "collection"."floorPrevious6h"', 'floorChange6h')
                .addSelect('"collection"."floorPrice" - "collection"."floorPrevious24h"', 'floorChange24h')
                .addSelect('"collection"."floorPrice" - "collection"."floorPrevious7d"', 'floorChange7d')
                .addSelect('"collection"."floorPrice" - "collection"."floorPrevious30d"', 'floorChange30d')
                .addSelect('"collection"."saleCount"', 'saleCount')
                .addSelect('"collection"."saleCount1h"', 'saleCount1h')
                .addSelect('"collection"."saleCount6h"', 'saleCount6h')
                .addSelect('"collection"."saleCount24h"', 'saleCount24h')
                .addSelect('"collection"."saleCount7d"', 'saleCount7d')
                .addSelect('"collection"."saleCount30d"', 'saleCount30d')
                .addSelect('"collection"."totalSupply"', 'totalSupply')
                .addSelect('"collection"."ownerCount"', 'ownerCount')
                .addSelect('"collection"."listedCount"', 'listedCount');
        },
        name: 'collection_rankings_cache',
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
], CollectionRankingCached);
exports.CollectionRankingCached = CollectionRankingCached;
//# sourceMappingURL=CollectionRanking.view.js.map