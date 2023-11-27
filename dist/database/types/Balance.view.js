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
const class_transformer_1 = require("class-transformer");
const __1 = require("..");
const __2 = require("../..");
let Balance = class Balance extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Balance.prototype, "collectionAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Balance.prototype, "tokenId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    (0, class_transformer_1.Transform)(({ value }) => ethers_1.ethers.utils.getAddress(value), {
        toPlainOnly: true,
    }),
    __metadata("design:type", String)
], Balance.prototype, "userAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], Balance.prototype, "balance", void 0);
Balance = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        expression: (dataSource) => {
            return (dataSource
                .createQueryBuilder()
                .from(__1.BalanceEntity, 'balance')
                .leftJoin(__1.CollectionRankingCached, 'collection', '"collection"."address" = "balance"."collectionAddress"')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCached, 'order')
                .select()
                .where(`"order"."type" IN ('${__1.OrderType.ASK}', '${__1.OrderType.DUTCH_AUCTION}')`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere(new typeorm_1.Brackets((query) => query
                .where('"order"."endTime" > NOW()')
                .orWhere('"order"."endTime" IS NULL')))
                .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
                .orderBy('"order"."collectionAddress"')
                .addOrderBy('"order"."tokenId"')
                .addOrderBy(`CASE WHEN "order"."type" = '${__1.OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END`, 'ASC'), 'buyNow', '"buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCached, 'order')
                .select()
                .where(`"order"."type" = '${__1.OrderType.BID}'`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere(new typeorm_1.Brackets((query) => query
                .where('"order"."endTime" > NOW()')
                .orWhere('"order"."endTime" IS NULL')))
                .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
                .orderBy('"order"."collectionAddress"')
                .addOrderBy('"order"."tokenId"')
                .addOrderBy('"order"."price"', 'DESC'), 'sellNow', '"sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCached, 'order')
                .select()
                .where(`"order"."type" = '${__1.OrderType.ENGLISH_AUCTION}'`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere(new typeorm_1.Brackets((query) => query
                .where('"order"."endTime" > NOW()')
                .orWhere('"order"."endTime" IS NULL')))
                .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
                .orderBy('"order"."collectionAddress"')
                .addOrderBy('"order"."tokenId"')
                .addOrderBy('"order"."endTime"', 'ASC'), // TODO: Order by highest bid
            'auction', '"auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"')
                .leftJoin((q) => q
                .from(__1.SaleEntity, 'sale')
                .select()
                .distinctOn(['"sale"."collectionAddress"', '"sale"."tokenId"'])
                .orderBy('"sale"."collectionAddress"')
                .addOrderBy('"sale"."tokenId"')
                .addOrderBy('"timestamp"', 'DESC'), 'lastSale', '"lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"')
                .leftJoin((q) => q
                .from(__1.TransferEntity, 'transfer')
                .select()
                .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
            ])
                .orderBy('"transfer"."collectionAddress"')
                .addOrderBy('"transfer"."tokenId"')
                .addOrderBy('"timestamp"', 'ASC'), 'mint', '"mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"')
                .leftJoin((q) => q
                .from(__1.TransferEntity, 'transfer')
                .select()
                .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
            ])
                .orderBy('"transfer"."collectionAddress"')
                .addOrderBy('"transfer"."tokenId"')
                .addOrderBy('"timestamp"', 'DESC'), 'lastTransfer', '"lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId"')
                .select('"balance"."collectionAddress"', 'collectionAddress')
                .addSelect('"balance"."tokenId"', 'tokenId')
                .addSelect('"balance"."userAddress"', 'userAddress')
                .addSelect('"balance"."balance"', 'balance')
                .where('"balance"."balance" > 0')
                // Used for searching
                .addSelect((q) => q
                .from(__1.ItemEntity, 'item')
                .select('"item"."description"')
                .where('"item"."collectionAddress" = "balance"."collectionAddress"')
                .andWhere('"item"."tokenId" = "balance"."tokenId"'), 'description')
                .addSelect((q) => q
                .from(__1.ItemEntity, 'item')
                .select('"item"."title"')
                .where('"item"."collectionAddress" = "balance"."collectionAddress"')
                .andWhere('"item"."tokenId" = "balance"."tokenId"'), 'title')
                // Used for sorting/filtering, but not included in the GraphQL output
                .addSelect((q) => q
                .fromDummy()
                .select(`EXISTS ${q
                .subQuery()
                .from(__1.HiddenItem, 'hidden')
                .select('1')
                .where('"hidden"."userAddress" = "balance"."userAddress"')
                .andWhere('"hidden"."collectionAddress" = "balance"."collectionAddress"')
                .andWhere('"hidden"."tokenId" = "balance"."tokenId"')
                .getQuery()}`), 'hidden')
                .addSelect((q) => q
                .from(__1.ItemEntity, 'item')
                .select('CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END')
                .where('"item"."collectionAddress" = "balance"."collectionAddress"')
                .andWhere('"item"."tokenId" = "balance"."tokenId"'), 'rarityBasisPoints')
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
                .where('"like"."collectionAddress" = "balance"."collectionAddress"')
                .andWhere('"like"."tokenId" = "balance"."tokenId"'), 'likeCount')
                // Some LEFT JOINs could return several rows, so we deduplicate results here
                .distinctOn([
                '"balance"."collectionAddress"',
                '"balance"."tokenId"',
                '"balance"."userAddress"',
            ])
                .orderBy('"balance"."collectionAddress"')
                .addOrderBy('"balance"."tokenId"')
                .addOrderBy('"balance"."userAddress"')
                .addOrderBy('"sellNow"."price"', 'DESC'));
        },
        name: 'balances_view',
    })
], Balance);
exports.Balance = Balance;
//# sourceMappingURL=Balance.view.js.map