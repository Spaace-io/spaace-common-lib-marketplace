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
const Sale_entity_1 = require("./Sale.entity");
const __1 = require("../..");
const ethers_1 = require("ethers");
const Collection_entity_1 = require("./Collection.entity");
const Order_entity_1 = require("./Order.entity");
const types_1 = require("../types");
function getVolumeQuery(interval) {
    return (query) => query.fromDummy().select(`COALESCE(${query
        .subQuery()
        .from(Sale_entity_1.SaleEntity, 'sale')
        .select('SUM("sale"."price")')
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
        .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`)
        .getQuery()}, 0)`);
}
function getVolumeChangeQuery(interval) {
    return (query) => query.fromDummy().select(`COALESCE(${query
        .subQuery()
        .from(Sale_entity_1.SaleEntity, 'sale')
        .select(`${getVolumeQuery(interval)(query.subQuery()).getQuery()} - SUM("sale"."price")`)
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
        .andWhere(`"sale"."timestamp" > NOW() - (INTERVAL '${interval}' * 2)`)
        .andWhere(`"sale"."timestamp" <= NOW() - INTERVAL '${interval}'`)
        .getQuery()}, 0)`);
}
function getFloorPriceQuery(timestamp) {
    return (query) => {
        query = query
            .from(types_1.Order, 'order')
            .select(`MIN(CASE WHEN "order"."type" = '${Order_entity_1.OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM ${timestamp !== null && timestamp !== void 0 ? timestamp : 'NOW()'} - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END)`)
            .where(`"order"."type" IN ('${Order_entity_1.OrderType.ASK}', '${Order_entity_1.OrderType.DUTCH_AUCTION}')`)
            .andWhere('"order"."collectionAddress" = "collection"."address"')
            .andWhere(`"order"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`);
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
                .from(Sale_entity_1.SaleEntity, 'sale')
                .where('"sale"."orderHash" = "order"."hash"')
                .getQuery()}`)
                .andWhere(`"order"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
                .andWhere((query) => `${query
                .subQuery()
                .select('"balance"."balance"')
                .from(types_1.Balance, 'balance')
                .where('"balance"."userAddress" = "order"."userAddress"')
                .andWhere('"balance"."collectionAddress" = "order"."collectionAddress"')
                .andWhere('"balance"."tokenId" = "order"."tokenId"')
                .getQuery()} > 0`);
        }
        return query;
    };
}
function getFloorChangeQuery(interval) {
    return (query) => query
        .fromDummy()
        .select(`COALESCE(${getFloorPriceQuery()(query.subQuery()).getQuery()}, 0) - COALESCE(${getFloorPriceQuery(`(NOW() - INTERVAL '${interval}')`)(query.subQuery()).getQuery()}, 0)`);
}
function getSaleCountQuery(interval) {
    return (query) => query
        .from(Sale_entity_1.SaleEntity, 'sale')
        .select('COUNT(*)')
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`)
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
], CollectionRanking.prototype, "volume1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volumeChange30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], CollectionRanking.prototype, "volume", void 0);
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
], CollectionRanking.prototype, "floorPrice", void 0);
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
                .from(Collection_entity_1.CollectionEntity, 'collection')
                .select('"collection"."address"')
                .addSelect(getVolumeQuery('1 hour'), 'volume1h')
                .addSelect(getVolumeChangeQuery('1 hour'), 'volumeChange1h')
                .addSelect(getVolumeQuery('6 hours'), 'volume6h')
                .addSelect(getVolumeChangeQuery('6 hours'), 'volumeChange6h')
                .addSelect(getVolumeQuery('1 day'), 'volume24h')
                .addSelect(getVolumeChangeQuery('1 day'), 'volumeChange24h')
                .addSelect(getVolumeQuery('7 days'), 'volume7d')
                .addSelect(getVolumeChangeQuery('7 days'), 'volumeChange7d')
                .addSelect(getVolumeChangeQuery('30 days'), 'volumeChange30d')
                .addSelect(getVolumeQuery('30 days'), 'volume30d')
                .addSelect((query) => query
                .from(Sale_entity_1.SaleEntity, 'sale')
                .select('SUM("sale"."price")')
                .where('"sale"."collectionAddress" = "collection"."address"')
                .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`), 'volume')
                .addSelect(getFloorPriceQuery(), 'floorPrice')
                .addSelect(getFloorChangeQuery('1 hour'), 'floorChange1h')
                .addSelect(getFloorChangeQuery('6 hours'), 'floorChange6h')
                .addSelect(getFloorChangeQuery('1 day'), 'floorChange24h')
                .addSelect(getFloorChangeQuery('7 days'), 'floorChange7d')
                .addSelect(getFloorChangeQuery('30 days'), 'floorChange30d')
                .addSelect(getSaleCountQuery('1 hour'), 'saleCount1h')
                .addSelect(getSaleCountQuery('6 hours'), 'saleCount6h')
                .addSelect(getSaleCountQuery('1 day'), 'saleCount24h')
                .addSelect(getSaleCountQuery('7 days'), 'saleCount7d')
                .addSelect(getSaleCountQuery('30 days'), 'saleCount30d')
                .addSelect((query) => query
                .from(Sale_entity_1.SaleEntity, 'sale')
                .select('COUNT(*)')
                .where('"sale"."collectionAddress" = "collection"."address"')
                .andWhere(`"sale"."currency" IN ('${__1.utils.strip0x(ethers_1.ethers.constants.AddressZero)}', '${__1.utils.strip0x(__1.utils.constants.WETH_ADDRESS)}')`), 'saleCount')
                .addSelect((query) => query
                .from(types_1.Balance, 'balance')
                .select('SUM("balance"."balance")')
                .where('"balance"."collectionAddress" = "collection"."address"'), 'totalSupply')
                .addSelect((query) => query
                .from(types_1.Balance, 'balance')
                .select('COUNT(DISTINCT "balance"."userAddress")')
                .where('"balance"."collectionAddress" = "collection"."address"'), 'ownerCount')
                .addSelect((query) => query
                .from(types_1.Order, 'order')
                .select('COUNT(DISTINCT "order"."tokenId")')
                .where(`"order"."type" <> '${Order_entity_1.OrderType.BID}'`)
                .andWhere('"order"."collectionAddress" = "collection"."address"')
                .andWhere('"order"."active"'), 'listedCount');
        },
        name: 'collection_rankings',
        materialized: true,
    }),
    (0, typeorm_1.Index)(['volume1h']),
    (0, typeorm_1.Index)(['volumeChange1h']),
    (0, typeorm_1.Index)(['volume6h']),
    (0, typeorm_1.Index)(['volumeChange6h']),
    (0, typeorm_1.Index)(['volume24h']),
    (0, typeorm_1.Index)(['volumeChange24h']),
    (0, typeorm_1.Index)(['volume7d']),
    (0, typeorm_1.Index)(['volumeChange7d']),
    (0, typeorm_1.Index)(['volume30d']),
    (0, typeorm_1.Index)(['volumeChange30d']),
    (0, typeorm_1.Index)(['volume']),
    (0, typeorm_1.Index)(['floorChange1h']),
    (0, typeorm_1.Index)(['floorChange6h']),
    (0, typeorm_1.Index)(['floorChange24h']),
    (0, typeorm_1.Index)(['floorChange7d']),
    (0, typeorm_1.Index)(['floorChange30d']),
    (0, typeorm_1.Index)(['floorPrice'])
], CollectionRanking);
exports.CollectionRanking = CollectionRanking;
//# sourceMappingURL=CollectionRanking.view.js.map