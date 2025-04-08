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
exports.Collection = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const __1 = require("..");
const __2 = require("../..");
let Collection = class Collection extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Collection.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)(() => __1.CollectionType),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "symbol", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "active", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "verified", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "explicit", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "bannerUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "deployedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => (value !== null ? ethers_1.ethers.utils.getAddress(value) : null), {
        toPlainOnly: true,
    }),
    __metadata("design:type", Object)
], Collection.prototype, "deployer", void 0);
__decorate([
    (0, graphql_1.Field)(() => [__1.CollectionLink]),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Type)(() => __1.CollectionLink),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], Collection.prototype, "links", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "lastImport", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "volume90d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousVolume1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousVolume6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousVolume24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousVolume7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousVolume30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousVolume90d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "floorPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "previousFloorPrice1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "previousFloorPrice6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "previousFloorPrice24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "previousFloorPrice7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "previousFloorPrice30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "previousFloorPrice90d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "saleCount90d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousSaleCount1h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousSaleCount6h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousSaleCount24h", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousSaleCount7d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousSaleCount30d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "previousSaleCount90d", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "totalSupply", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "ownerCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Collection.prototype, "listedCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Boolean)
], Collection.prototype, "notable", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Collection.prototype, "maxRarityRanking", void 0);
Collection = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => dataSource
            .createQueryBuilder()
            .from(__1.CollectionEntity, 'collection')
            .leftJoin(__1.CollectionRankingCached, 'ranking', '"ranking"."address" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales_volume_10y', 'sales')
            .select('"collectionAddress"')
            .addSelect('SUM("volume")', 'volume')
            .addSelect('SUM("saleCount")', 'saleCount')
            .groupBy('"collectionAddress"'), 'sales_volume', '"sales_volume"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales', 'sales')
            .select('"collectionAddress"')
            .addSelect('SUM("perUnitPrice")', 'volume1h')
            .addSelect('SUM("amount")', 'saleCount1h')
            .where('"timestamp" >= NOW() - INTERVAL \'1 hour\'')
            .groupBy('"collectionAddress"'), 'sales_volume_1h', '"sales_volume_1h"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales', 'sales')
            .select('"collectionAddress"')
            .addSelect('SUM("perUnitPrice")', 'previousVolume1h')
            .addSelect('SUM("amount")', 'previousSaleCount1h')
            .where("\"timestamp\" >= NOW() - INTERVAL '1 hour' - INTERVAL '1 hour'")
            .andWhere('"timestamp" < NOW() - INTERVAL \'1 hour\'')
            .groupBy('"collectionAddress"'), 'sales_volume_1h_prev', '"sales_volume_1h_prev"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales', 'sales_volume_6h')
            .select('"collectionAddress"')
            .addSelect('SUM("perUnitPrice")', 'volume6h')
            .addSelect('SUM("amount")', 'saleCount6h')
            .where('"timestamp" >= NOW() - INTERVAL \'6 hour\'')
            .groupBy('"collectionAddress"'), 'sales_volume_6h', '"sales_volume_6h"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales', 'sales_volume_6h')
            .select('"collectionAddress"')
            .addSelect('SUM("perUnitPrice")', 'previousVolume6h')
            .addSelect('SUM("amount")', 'previousSaleCount6h')
            .where("\"timestamp\" >= NOW() - INTERVAL '6 hour' - INTERVAL '6 hour'")
            .andWhere('"timestamp" < NOW() - INTERVAL \'6 hour\'')
            .groupBy('"collectionAddress"'), 'sales_volume_6h_prev', '"sales_volume_6h_prev"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales_volume_1d', 'sales_volume_1d')
            .select('"collectionAddress"')
            .addSelect('"volume"', 'volume24h')
            .addSelect('"saleCount"', 'saleCount24h')
            .where('"bucket_1d" >= NOW() - INTERVAL \'1 day\''), 'sales_volume_1d', '"sales_volume_1d"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales_volume_1d', 'sales_volume_1d')
            .select('"collectionAddress"')
            .addSelect('"volume"', 'previousVolume24h')
            .addSelect('"saleCount"', 'previousSaleCount24h')
            .where("\"bucket_1d\" >= NOW() - INTERVAL '1 day' - INTERVAL '1 day'")
            .andWhere('"bucket_1d" < NOW() - INTERVAL \'1 day\''), 'sales_volume_1d_prev', '"sales_volume_1d_prev"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales_volume_1d', 'sales_volume_7d')
            .select('"collectionAddress"')
            .addSelect('SUM("volume")', 'volume7d')
            .addSelect('SUM("saleCount")', 'saleCount7d')
            .where('"bucket_1d" >= NOW() - INTERVAL \'7 day\'')
            .groupBy('"collectionAddress"'), 'sales_volume_7d', '"sales_volume_7d"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales_volume_1d', 'sales_volume_7d')
            .select('"collectionAddress"')
            .addSelect('SUM("volume")', 'previousVolume7d')
            .addSelect('SUM("saleCount")', 'previousSaleCount7d')
            .where("\"bucket_1d\" >= NOW() - INTERVAL '7 day' - INTERVAL '7 day'")
            .andWhere('"bucket_1d" < NOW() - INTERVAL \'7 day\'')
            .groupBy('"collectionAddress"'), 'sales_volume_7d_prev', '"sales_volume_7d_prev"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales_volume_1d', 'sales_volume_30d')
            .select('"collectionAddress"')
            .addSelect('SUM("volume")', 'volume30d')
            .addSelect('SUM("saleCount")', 'saleCount30d')
            .where('"bucket_1d" >= NOW() - INTERVAL \'30 day\'')
            .groupBy('"collectionAddress"'), 'sales_volume_30d', '"sales_volume_30d"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales_volume_1d', 'sales_volume_30d')
            .select('"collectionAddress"')
            .addSelect('SUM("volume")', 'previousVolume30d')
            .addSelect('SUM("saleCount")', 'previousSaleCount30d')
            .where("\"bucket_1d\" >= NOW() - INTERVAL '30 day' - INTERVAL '30 day'")
            .andWhere('"bucket_1d" < NOW() - INTERVAL \'30 day\'')
            .groupBy('"collectionAddress"'), 'sales_volume_30d_prev', '"sales_volume_30d_prev"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales_volume_90d', 'sales_volume_90d')
            .select('"collectionAddress"')
            .addSelect('"volume"', 'volume90d')
            .addSelect('"saleCount"', 'saleCount90d')
            .where('"bucket_90d" >= NOW() - INTERVAL \'90 day\''), 'sales_volume_90d', '"sales_volume_90d"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('sales_volume_90d', 'sales_volume_90d')
            .select('"collectionAddress"')
            .addSelect('"volume"', 'previousVolume90d')
            .addSelect('"saleCount"', 'previousSaleCount90d')
            .where("\"bucket_90d\" >= NOW() - INTERVAL '90 day' - INTERVAL '90 day'")
            .andWhere('"bucket_90d" < NOW() - INTERVAL \'90 day\''), 'sales_volume_90d_prev', '"sales_volume_90d_prev"."collectionAddress" = "collection"."address"')
            .leftJoin((qb) => qb
            .from('active_orders_cache_view', 'order')
            .select('"collectionAddress"')
            .addSelect(`MIN(
                CASE
                  WHEN "order"."type" = '${__1.OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."perUnitPrice") * EXTRACT(
                    EPOCH
                    FROM
                      NOW() - "order"."startTime"
                  ) / EXTRACT(
                    EPOCH
                    FROM
                      "order"."endTime" - "order"."startTime"
                  )
                  ELSE "order"."perUnitPrice"
                END
              )`, 'floorPrice')
            .where('"order"."endTime" >= NOW() OR "order"."endTime" IS NULL')
            .andWhere(`"order"."currency" IN ('${__2.utils
            .strip0x(__2.utils.constants.ETH_TOKENS)
            .join("','")}')`)
            .andWhere(`"order"."type" IN ('${__1.OrderType.ASK}', '${__1.OrderType.DUTCH_AUCTION}', '${__1.OrderType.ENGLISH_AUCTION}')`)
            .andWhere('"order"."remainingQuantity" > 0')
            .groupBy('"collectionAddress"'), 'floor_price', '"floor_price"."collectionAddress" = "collection"."address"')
            .select('"collection"."address"', 'address')
            .addSelect('"collection"."type"', 'type')
            .addSelect('"collection"."name"', 'name')
            .addSelect('"collection"."symbol"', 'symbol')
            .addSelect('"collection"."imageUrl"', 'imageUrl')
            .addSelect('"collection"."active"', 'active')
            .addSelect('"collection"."verified"', 'verified')
            .addSelect('"collection"."explicit"', 'explicit')
            .addSelect('"collection"."bannerUrl"', 'bannerUrl')
            .addSelect('"collection"."description"', 'description')
            .addSelect('"collection"."deployedAt"', 'deployedAt')
            .addSelect('"collection"."deployer"', 'deployer')
            .addSelect('"collection"."links"', 'links')
            .addSelect('"collection"."lastImport"', 'lastImport')
            .addSelect('floor_price."floorPrice"', 'floorPrice')
            .addSelect('0', 'previousFloorPrice1h')
            .addSelect('0', 'previousFloorPrice6h')
            .addSelect('0', 'previousFloorPrice24h')
            .addSelect('0', 'previousFloorPrice7d')
            .addSelect('0', 'previousFloorPrice30d')
            .addSelect('0', 'previousFloorPrice90d')
            .addSelect('COALESCE(sales_volume."volume", 0)', 'volume')
            .addSelect('COALESCE(sales_volume."saleCount", 0)', 'saleCount')
            .addSelect('COALESCE(sales_volume_1h."volume1h", 0)', 'volume1h')
            .addSelect('COALESCE(sales_volume_1h."saleCount1h", 0)', 'saleCount1h')
            .addSelect('COALESCE(sales_volume_1h_prev."previousVolume1h", 0)', 'previousVolume1h')
            .addSelect('COALESCE(sales_volume_1h_prev."previousSaleCount1h", 0)', 'previousSaleCount1h')
            .addSelect('COALESCE(sales_volume_6h."volume6h", 0)', 'volume6h')
            .addSelect('COALESCE(sales_volume_6h."saleCount6h", 0)', 'saleCount6h')
            .addSelect('COALESCE(sales_volume_6h_prev."previousVolume6h", 0)', 'previousVolume6h')
            .addSelect('COALESCE(sales_volume_6h_prev."previousSaleCount6h", 0)', 'previousSaleCount6h')
            .addSelect('COALESCE(sales_volume_1d."volume24h", 0)', 'volume24h')
            .addSelect('COALESCE(sales_volume_1d."saleCount24h", 0)', 'saleCount24h')
            .addSelect('COALESCE(sales_volume_1d_prev."previousVolume24h", 0)', 'previousVolume24h')
            .addSelect('COALESCE(sales_volume_1d_prev."previousSaleCount24h", 0)', 'previousSaleCount24h')
            .addSelect('COALESCE(sales_volume_7d."volume7d", 0)', 'volume7d')
            .addSelect('COALESCE(sales_volume_7d."saleCount7d", 0)', 'saleCount7d')
            .addSelect('COALESCE(sales_volume_7d_prev."previousVolume7d", 0)', 'previousVolume7d')
            .addSelect('COALESCE(sales_volume_7d_prev."previousSaleCount7d", 0)', 'previousSaleCount7d')
            .addSelect('COALESCE(sales_volume_30d."volume30d", 0)', 'volume30d')
            .addSelect('COALESCE(sales_volume_30d."saleCount30d", 0)', 'saleCount30d')
            .addSelect('COALESCE(sales_volume_30d_prev."previousVolume30d", 0)', 'previousVolume30d')
            .addSelect('COALESCE(sales_volume_30d_prev."previousSaleCount30d", 0)', 'previousSaleCount30d')
            .addSelect('COALESCE(sales_volume_90d."volume90d", 0)', 'volume90d')
            .addSelect('COALESCE(sales_volume_90d."saleCount90d", 0)', 'saleCount90d')
            .addSelect('COALESCE(sales_volume_90d_prev."previousVolume90d", 0)', 'previousVolume90d')
            .addSelect('COALESCE(sales_volume_90d_prev."previousSaleCount90d", 0)', 'previousSaleCount90d')
            .addSelect('COALESCE("ranking"."totalSupply", 0)', 'totalSupply')
            .addSelect('COALESCE("ranking"."ownerCount", 0)', 'ownerCount')
            .addSelect('COALESCE("ranking"."listedCount", 0)', 'listedCount')
            .addSelect((query) => query
            .fromDummy()
            .select(`EXISTS ${query
            .subQuery()
            .select('1')
            .from(__1.NotableCollection, 'notable')
            .where('"notable"."collectionAddress" = "collection"."address"')
            .getQuery()}`), 'notable')
            .addSelect((query) => query
            .from(__1.ItemEntity, 'item')
            .select('MAX("item"."rarityRanking") as "maxRarityRanking"')
            .where('"item"."collectionAddress" = "collection"."address"'), 'maxRarityRanking'),
        name: 'collections_view',
    })
], Collection);
exports.Collection = Collection;
//# sourceMappingURL=Collection.view.js.map