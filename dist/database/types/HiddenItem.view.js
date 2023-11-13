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
exports.HiddenItem = void 0;
const graphql_1 = require("@nestjs/graphql");
const ethers_1 = require("ethers");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
const __2 = require("../..");
let HiddenItem = class HiddenItem extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], HiddenItem.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], HiddenItem.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], HiddenItem.prototype, "userAddress", void 0);
HiddenItem = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return (dataSource
                .createQueryBuilder()
                .from(__1.HiddenItemEntity, 'hidden')
                .leftJoin(__1.CollectionRankingCached, 'collection', '"collection"."address" = "hidden"."collectionAddress"')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCached, 'order')
                .select()
                .where(`"order"."type" IN ('${__1.OrderType.ASK}', '${__1.OrderType.DUTCH_AUCTION}')`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
                .orderBy('"order"."collectionAddress"')
                .addOrderBy('"order"."tokenId"')
                .addOrderBy(`CASE WHEN "order"."type" = '${__1.OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END`, 'ASC'), 'buyNow', '"buyNow"."collectionAddress" = "hidden"."collectionAddress" AND "buyNow"."tokenId" = "hidden"."tokenId"')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCached, 'order')
                .select()
                .where(`"order"."type" = '${__1.OrderType.BID}'`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
                .orderBy('"order"."collectionAddress"')
                .addOrderBy('"order"."tokenId"')
                .addOrderBy('"order"."price"', 'DESC'), 'sellNow', '"sellNow"."collectionAddress" = "hidden"."collectionAddress" AND ("sellNow"."tokenId" = "hidden"."tokenId" OR "sellNow"."tokenId" IS NULL)')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCached, 'order')
                .select()
                .where(`"order"."type" = '${__1.OrderType.ENGLISH_AUCTION}'`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
                .orderBy('"order"."collectionAddress"')
                .addOrderBy('"order"."tokenId"')
                .addOrderBy('"order"."endTime"', 'ASC'), // TODO: Order by highest bid
            'auction', '"auction"."collectionAddress" = "hidden"."collectionAddress" AND "auction"."tokenId" = "hidden"."tokenId"')
                .leftJoin((q) => q
                .from(__1.SaleEntity, 'sale')
                .select()
                .distinctOn(['"sale"."collectionAddress"', '"sale"."tokenId"'])
                .orderBy('"sale"."collectionAddress"')
                .addOrderBy('"sale"."tokenId"')
                .addOrderBy('"timestamp"', 'DESC'), 'lastSale', '"lastSale"."collectionAddress" = "hidden"."collectionAddress" AND "lastSale"."tokenId" = "hidden"."tokenId"')
                .leftJoin((q) => q
                .from(__1.TransferEntity, 'transfer')
                .select()
                .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
            ])
                .orderBy('"transfer"."collectionAddress"')
                .addOrderBy('"transfer"."tokenId"')
                .addOrderBy('"timestamp"', 'ASC'), 'mint', '"mint"."collectionAddress" = "hidden"."collectionAddress" AND "mint"."tokenId" = "hidden"."tokenId"')
                .leftJoin((q) => q
                .from(__1.TransferEntity, 'transfer')
                .select()
                .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
            ])
                .orderBy('"transfer"."collectionAddress"')
                .addOrderBy('"transfer"."tokenId"')
                .addOrderBy('"timestamp"', 'DESC'), 'lastTransfer', '"lastTransfer"."collectionAddress" = "hidden"."collectionAddress" AND "lastTransfer"."tokenId" = "hidden"."tokenId"')
                .select('"hidden"."collectionAddress"', 'collectionAddress')
                .addSelect('"hidden"."tokenId"', 'tokenId')
                .addSelect('"hidden"."userAddress"', 'userAddress')
                // Used for searching
                .addSelect((q) => q
                .from(__1.ItemEntity, 'item')
                .select('"item"."description"')
                .where('"item"."collectionAddress" = "hidden"."collectionAddress"')
                .andWhere('"item"."tokenId" = "hidden"."tokenId"'), 'description')
                .addSelect((q) => q
                .from(__1.ItemEntity, 'item')
                .select('"item"."title"')
                .where('"item"."collectionAddress" = "hidden"."collectionAddress"')
                .andWhere('"item"."tokenId" = "hidden"."tokenId"'), 'title')
                // Used for sorting/filtering, but not included in the GraphQL output
                .addSelect((q) => q
                .from(__1.ItemEntity, 'item')
                .select('CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END')
                .where('"item"."collectionAddress" = "hidden"."collectionAddress"')
                .andWhere('"item"."tokenId" = "hidden"."tokenId"'), 'rarityBasisPoints')
                .addSelect(`CASE WHEN "buyNow"."type" = '${__1.OrderType.DUTCH_AUCTION}' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END`, 'buyNowPrice')
                .addSelect('"buyNow"."startTime"', 'buyNowStartTime')
                .addSelect('"sellNow"."price"', 'sellNowPrice')
                .addSelect('"sellNow"."startTime"', 'sellNowStartTime')
                .addSelect('CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END', 'auctionPrice')
                .addSelect('"auction"."endTime"', 'auctionEndTime')
                .addSelect('"lastSale"."price"', 'lastSalePrice')
                .addSelect('"lastSale"."timestamp"', 'lastSaleTimestamp')
                .addSelect('"mint"."timestamp"', 'mintTimestamp')
                .addSelect('"lastTransfer"."timestamp"', 'lastTransferTimestamp')
                .addSelect((q) => q
                .from(__1.Like, 'like')
                .select('COUNT(*)')
                .where('"like"."collectionAddress" = "hidden"."collectionAddress"')
                .andWhere('"like"."tokenId" = "hidden"."tokenId"'), 'likeCount')
                // Some LEFT JOINs could return several rows, so we deduplicate results here
                .distinctOn([
                '"hidden"."collectionAddress"',
                '"hidden"."tokenId"',
                '"hidden"."userAddress"',
            ])
                .orderBy('"hidden"."collectionAddress"')
                .addOrderBy('"hidden"."tokenId"')
                .addOrderBy('"hidden"."userAddress"')
                .addOrderBy('"sellNow"."price"', 'DESC'));
        },
        name: 'hidden_items_view',
    })
], HiddenItem);
exports.HiddenItem = HiddenItem;
//# sourceMappingURL=HiddenItem.view.js.map