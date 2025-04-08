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
const enums_1 = require("../enums");
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
                .innerJoin(__1.ItemEntity, 'item', '"item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId"')
                .leftJoin(__1.CollectionRankingCached, 'collection', '"collection"."address" = "balance"."collectionAddress"')
                .leftJoin((q) => q
                .from(__1.ActiveOrderCachedEntity, 'order')
                .select('"order".*')
                .addSelect(`
                CASE
                  WHEN "order".TYPE = 'DUTCH_AUCTION'::ORDER_TYPE THEN "order"."startingPrice" - ("order"."startingPrice" - "order".PRICE) * EXTRACT(
                    EPOCH
                    FROM
                      NOW() - "order"."startTime"::TIMESTAMP WITH TIME ZONE
                  ) / EXTRACT(
                    EPOCH
                    FROM
                      "order"."endTime" - "order"."startTime"
                  )
                  ELSE "order".PRICE
                END AS "buyNowPrice"
                `)
                .addSelect(`
                CASE
                  WHEN "order".TYPE = 'DUTCH_AUCTION'::ORDER_TYPE THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."perUnitPrice") * EXTRACT(
                    EPOCH
                    FROM
                      NOW() - "order"."startTime"::TIMESTAMP WITH TIME ZONE
                  ) / EXTRACT(
                    EPOCH
                    FROM
                      "order"."endTime" - "order"."startTime"
                  )
                  ELSE "order"."perUnitPrice"
                END AS "buyNowPerUnitPrice"
                `)
                .addSelect((query) => query
                .from(__1.OrderItemEntity, 'orders_items')
                .select('array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds"')
                .where('"orders_items"."hash" = "order"."hash"'), 'tokenIds')
                .where(`"order"."type" IN ('${enums_1.OrderType.ASK}', '${enums_1.OrderType.DUTCH_AUCTION}')`)
                .andWhere(`"order"."currency" IN ('${__2.utils
                .strip0x(__2.utils.constants.ETH_TOKENS)
                .join("','")}')`)
                .andWhere('"order"."endTime" > NOW()')
                .andWhere('"order"."startTime" <= NOW()')
                .addOrderBy(`CASE WHEN "order"."type" = '${enums_1.OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."perUnitPrice" END`, 'ASC')
                .addOrderBy('"order"."marketplace"', 'ASC'), 'buyNow', '"buyNow"."collectionAddress" = "balance"."collectionAddress" AND "balance"."tokenId"::TEXT = ANY("buyNow"."tokenIds")')
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
                .andWhere('"order"."endTime" > NOW()')
                .andWhere('"order"."startTime" <= NOW()')
                .addOrderBy('"order"."perUnitPrice"', 'DESC')
                .addOrderBy('"order"."marketplace"', 'ASC'), 'sellNow', '"sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("balance"."tokenId"::TEXT = ANY("sellNow"."tokenIds") OR "sellNow"."tokenIds" IS NULL)')
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
                .andWhere('"order"."endTime" > NOW()')
                .andWhere('"order"."startTime" <= NOW()')
                .addOrderBy('"order"."endTime"', 'ASC')
                .addOrderBy('"order"."marketplace"', 'ASC'), // TODO: Order by highest bid
            'auction', '"auction"."collectionAddress" = "balance"."collectionAddress" AND "balance"."tokenId"::TEXT = ANY("auction"."tokenIds")')
                // .leftJoin(
                //   (q) =>
                //     q
                //       .from(SaleEntity, 'sale')
                //       .select()
                //       .distinctOn(['"sale"."collectionAddress"', '"sale"."tokenId"'])
                //       .orderBy('"sale"."collectionAddress"')
                //       .addOrderBy('"sale"."tokenId"')
                //       .addOrderBy('"timestamp"', 'DESC'),
                //   'lastSale',
                //   '"lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"',
                // )
                .leftJoin((q) => q
                .from(__1.TransferEntity, 'transfer')
                .select()
                .where(`
                (
                  (
                    TRANSFER."txHash",
                    TRANSFER."timestamp",
                    TRANSFER."logIdx"
                  ) = (
                    SELECT
                      MIN(T2."txHash") AS MIN,
                      MIN(T2."timestamp") AS MIN,
                      MIN(T2."logIdx") AS MIN
                    FROM
                      TRANSFERS T2
                    WHERE
                      T2."collectionAddress" = TRANSFER."collectionAddress"
                      AND T2."tokenId" = TRANSFER."tokenId"
                      AND T2."from" = '0000000000000000000000000000000000000000'::BPCHAR
                  )
                )`)
                .orderBy('"transfer"."collectionAddress"')
                .addOrderBy('"transfer"."tokenId"')
                .addOrderBy('"timestamp"', 'ASC'), 'mint', '"mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"')
                // .leftJoin(
                //   (q) =>
                //     q
                //       .from(TransferEntity, 'transfer')
                //       .select()
                //       .distinctOn([
                //         '"transfer"."collectionAddress"',
                //         '"transfer"."tokenId"',
                //       ])
                //       .orderBy('"transfer"."collectionAddress"')
                //       .addOrderBy('"transfer"."tokenId"')
                //       .addOrderBy('"timestamp"', 'DESC'),
                //   'lastTransfer',
                //   '"lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId"',
                // )
                .select('"balance"."collectionAddress"', 'collectionAddress')
                .addSelect('"balance"."tokenId"', 'tokenId')
                .addSelect('"balance"."userAddress"', 'userAddress')
                .addSelect('"balance"."balance"', 'balance')
                .where('"balance"."balance" > 0')
                // Used for searching
                .addSelect('"item"."description"', 'description')
                .addSelect('"item"."title"', 'title')
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
                .addSelect('"item"."rarityScore"', 'rarityScore')
                .addSelect('CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END', 'rarityBasisPoints')
                .addSelect(`"buyNow"."buyNowPrice"`, 'buyNowPrice')
                .addSelect(`"buyNow"."buyNowPerUnitPrice"`, 'buyNowPerUnitPrice')
                .addSelect('"buyNow"."startTime"', 'buyNowStartTime')
                .addSelect('"sellNow"."price"', 'sellNowPrice')
                .addSelect('"sellNow"."perUnitPrice"', 'sellNowPerUnitPrice')
                .addSelect('"sellNow"."startTime"', 'sellNowStartTime')
                .addSelect('"auction"."perUnitPrice"', 'auctionPerUnitPrice')
                .addSelect('"auction"."price"', 'auctionPrice')
                .addSelect('"auction"."endTime"', 'auctionEndTime')
                // .addSelect('"lastSale"."price"', 'lastSalePrice')
                // .addSelect('"lastSale"."perUnitPrice"', 'lastSalePerUnitPrice')
                // .addSelect('"lastSale"."timestamp"', 'lastSaleTimestamp')
                .addSelect('"mint"."timestamp"', 'mintTimestamp')
                // .addSelect('"lastTransfer"."timestamp"', 'lastTransferTimestamp')
                .addSelect((q) => q
                .from(__1.LikeEntity, 'like')
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
                .addOrderBy('"balance"."userAddress"'));
        },
        name: 'balances_view',
    })
], Balance);
exports.Balance = Balance;
//# sourceMappingURL=Balance.view.js.map