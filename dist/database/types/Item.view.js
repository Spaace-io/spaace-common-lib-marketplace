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
exports.Item = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
const __2 = require("../..");
const enums_1 = require("../enums");
let Item = class Item extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Item.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Item.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "tokenUri", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "decimals", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "rarityRanking", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "rarityScore", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Object)
], Item.prototype, "lastImport", void 0);
Item = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return (dataSource
                .createQueryBuilder()
                .from(__1.ItemEntity, 'item')
                .leftJoin(__1.CollectionRankingCached, 'collection', '"collection"."address" = "item"."collectionAddress"')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCachedEntity, 'order')
                .select('"order".*')
                .addSelect((query) => query
                .from(__1.OrderItemEntity, 'orders_items')
                .select('array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds"')
                .where('"orders_items"."hash" = "order"."hash"'), 'tokenIds')
                .where(`"order"."type" IN ('${enums_1.OrderType.ASK}', '${enums_1.OrderType.DUTCH_AUCTION}')`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere(new typeorm_1.Brackets((query) => query
                .where('"order"."endTime" > NOW()')
                .orWhere('"order"."endTime" IS NULL')))
                .distinctOn(['"order"."hash"'])
                .orderBy('"order"."hash"')
                // .distinctOn(['"order"."collectionAddress"', '"order"."tokenIds"'])
                // .orderBy('"order"."collectionAddress"')
                // .addOrderBy('"order"."tokenIds"')
                .addOrderBy(`CASE WHEN "order"."type" = '${enums_1.OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."perUnitPrice" END`, 'ASC'), 'buyNow', '"buyNow"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId"::TEXT = ANY("buyNow"."tokenIds")')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCachedEntity, 'order')
                .select('"order".*')
                .addSelect((query) => query
                .from(__1.OrderItemEntity, 'orders_items')
                .select('array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds"')
                .where('"orders_items"."hash" = "order"."hash"'), 'tokenIds')
                .where(`"order"."type" = '${enums_1.OrderType.BID}'`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere(new typeorm_1.Brackets((query) => query
                .where('"order"."endTime" > NOW()')
                .orWhere('"order"."endTime" IS NULL')))
                .distinctOn(['"order"."hash"'])
                .orderBy('"order"."hash"')
                // .distinctOn(['"order"."collectionAddress"', '"order"."tokenIds"'])
                // .orderBy('"order"."collectionAddress"')
                // .addOrderBy('"order"."tokenIds"')
                .addOrderBy('"order"."perUnitPrice"', 'DESC'), 'sellNow', '"sellNow"."collectionAddress" = "item"."collectionAddress" AND ("item"."tokenId"::TEXT = ANY("sellNow"."tokenIds") OR "sellNow"."tokenIds" IS NULL)')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCachedEntity, 'order')
                .select('"order".*')
                .addSelect((query) => query
                .from(__1.OrderItemEntity, 'orders_items')
                .select('array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds"')
                .where('"orders_items"."hash" = "order"."hash"'), 'tokenIds')
                .where(`"order"."type" = '${enums_1.OrderType.ENGLISH_AUCTION}'`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere(new typeorm_1.Brackets((query) => query
                .where('"order"."endTime" > NOW()')
                .orWhere('"order"."endTime" IS NULL')))
                .distinctOn(['"order"."hash"'])
                .orderBy('"order"."hash"')
                // .distinctOn(['"order"."collectionAddress"', '"order"."tokenIds"'])
                // .orderBy('"order"."collectionAddress"')
                // .addOrderBy('"order"."tokenIds"')
                .addOrderBy('"order"."endTime"', 'ASC'), // TODO: Order by highest bid
            'auction', '"auction"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId"::TEXT = ANY("auction"."tokenIds")')
                .leftJoin((q) => q
                .from(__1.SaleEntity, 'sale')
                .select()
                .distinctOn(['"sale"."collectionAddress"', '"sale"."tokenId"'])
                .orderBy('"sale"."collectionAddress"')
                .addOrderBy('"sale"."tokenId"')
                .addOrderBy('"timestamp"', 'DESC'), 'lastSale', '"lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"')
                .leftJoin((q) => q
                .from(__1.TransferEntity, 'transfer')
                .select()
                .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
            ])
                .orderBy('"transfer"."collectionAddress"')
                .addOrderBy('"transfer"."tokenId"')
                .addOrderBy('"timestamp"', 'ASC'), 'mint', '"mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"')
                .leftJoin((q) => q
                .from(__1.TransferEntity, 'transfer')
                .select()
                .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
            ])
                .orderBy('"transfer"."collectionAddress"')
                .addOrderBy('"transfer"."tokenId"')
                .addOrderBy('"timestamp"', 'DESC'), 'lastTransfer', '"lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId"')
                .select('"item"."collectionAddress"', 'collectionAddress')
                .addSelect('"item"."tokenId"', 'tokenId')
                .addSelect('"item"."title"', 'title')
                .addSelect('"item"."description"', 'description')
                .addSelect('"item"."tokenUri"', 'tokenUri')
                .addSelect('"item"."decimals"', 'decimals')
                .addSelect('"item"."rarityRanking"', 'rarityRanking')
                .addSelect('"item"."rarityScore"', 'rarityScore')
                .addSelect('"item"."lastImport"', 'lastImport')
                // Used for sorting/filtering, but not included in the GraphQL output
                .addSelect('CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END', 'rarityBasisPoints')
                .addSelect(`CASE WHEN "buyNow"."type" = '${enums_1.OrderType.DUTCH_AUCTION}' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END`, 'buyNowPrice')
                .addSelect(`CASE WHEN "buyNow"."type" = '${enums_1.OrderType.DUTCH_AUCTION}' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."perUnitPrice" END`, 'buyNowPerUnitPrice')
                .addSelect('"buyNow"."startTime"', 'buyNowStartTime')
                .addSelect('"sellNow"."price"', 'sellNowPrice')
                .addSelect('"sellNow"."perUnitPrice"', 'sellNowPerUnitPrice')
                .addSelect('"sellNow"."startTime"', 'sellNowStartTime')
                .addSelect('CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."perUnitPrice", "auction"."perUnitPrice") ELSE NULL END', 'auctionPerUnitPrice')
                .addSelect('CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END', 'auctionPrice')
                .addSelect('"auction"."endTime"', 'auctionEndTime')
                .addSelect('"lastSale"."price"', 'lastSalePrice')
                .addSelect('"lastSale"."timestamp"', 'lastSaleTimestamp')
                .addSelect('"mint"."timestamp"', 'mintTimestamp')
                .addSelect('"lastTransfer"."timestamp"', 'lastTransferTimestamp')
                .addSelect((q) => q
                .from(__1.LikeEntity, 'like')
                .select('COUNT(*)')
                .where('"like"."collectionAddress" = "item"."collectionAddress"')
                .andWhere('"like"."tokenId" = "item"."tokenId"'), 'likeCount')
                // Some LEFT JOINs could return several rows, so we deduplicate results here
                .distinctOn(['"item"."collectionAddress"', '"item"."tokenId"'])
                .orderBy('"item"."collectionAddress"')
                .addOrderBy('"item"."tokenId"')
                .addOrderBy('"sellNow"."perUnitPrice"', 'DESC'));
        },
        name: 'items_view',
    })
], Item);
exports.Item = Item;
//# sourceMappingURL=Item.view.js.map