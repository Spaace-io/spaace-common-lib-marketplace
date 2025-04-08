import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import {
  ActiveOrderCachedEntity,
  BalanceEntity,
  CollectionRankingCached,
  HiddenItem,
  ItemEntity,
  LikeEntity,
  OrderItemEntity,
  TransferEntity,
} from '..';
import { utils } from '../..';
import { OrderType } from '../enums';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return (
      dataSource
        .createQueryBuilder()
        .from(BalanceEntity, 'balance')
        .innerJoin(
          ItemEntity,
          'item',
          '"item"."collectionAddress" = "balance"."collectionAddress" AND "item"."tokenId" = "balance"."tokenId"',
        )
        .leftJoin(
          CollectionRankingCached,
          'collection',
          '"collection"."address" = "balance"."collectionAddress"',
        )
        .leftJoin(
          (q) =>
            q
              .from(ActiveOrderCachedEntity, 'order')
              .select('"order".*')
              .addSelect(
                `
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
                `,
              )
              .addSelect(
                `
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
                `,
              )
              .addSelect(
                (query) =>
                  query
                    .from(OrderItemEntity, 'orders_items')
                    .select(
                      'array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds"',
                    )
                    .where('"orders_items"."hash" = "order"."hash"'),
                'tokenIds',
              )
              .where(
                `"order"."type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}')`,
              )
              .andWhere(
                `"order"."currency" IN ('${utils
                  .strip0x(utils.constants.ETH_TOKENS)
                  .join("','")}')`,
              )
              .andWhere('"order"."endTime" > NOW()')
              .andWhere('"order"."startTime" <= NOW()')
              .addOrderBy(
                `CASE WHEN "order"."type" = '${OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."perUnitPrice" END`,
                'ASC',
              )
              .addOrderBy('"order"."marketplace"', 'ASC'),
          'buyNow',
          '"buyNow"."collectionAddress" = "balance"."collectionAddress" AND "balance"."tokenId"::TEXT = ANY("buyNow"."tokenIds")',
        )
        .leftJoin(
          (q) =>
            q
              .from(ActiveOrderCachedEntity, 'order')
              .select('"order".*')
              .addSelect(
                (query) =>
                  query
                    .from(OrderItemEntity, 'orders_items')
                    .select(
                      'array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds"',
                    )
                    .where('"orders_items"."hash" = "order"."hash"'),
                'tokenIds',
              )
              .where(`"order"."type" = '${OrderType.BID}'`)
              .andWhere(
                `"order"."currency" IN ('${utils
                  .strip0x(utils.constants.ETH_TOKENS)
                  .join("','")}')`,
              )
              .andWhere('"order"."endTime" > NOW()')
              .andWhere('"order"."startTime" <= NOW()')
              .addOrderBy('"order"."perUnitPrice"', 'DESC')
              .addOrderBy('"order"."marketplace"', 'ASC'),
          'sellNow',
          '"sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("balance"."tokenId"::TEXT = ANY("sellNow"."tokenIds") OR "sellNow"."tokenIds" IS NULL)',
        )
        .leftJoin(
          (q) =>
            q
              .from(ActiveOrderCachedEntity, 'order')
              .select('"order".*')
              .addSelect(
                (query) =>
                  query
                    .from(OrderItemEntity, 'orders_items')
                    .select(
                      'array_agg("orders_items"."tokenId")::TEXT[] as "tokenIds"',
                    )
                    .where('"orders_items"."hash" = "order"."hash"'),
                'tokenIds',
              )
              .where(`"order"."type" = '${OrderType.ENGLISH_AUCTION}'`)
              .andWhere(
                `"order"."currency" IN ('${utils
                  .strip0x(utils.constants.ETH_TOKENS)
                  .join("','")}')`,
              )
              .andWhere('"order"."endTime" > NOW()')
              .andWhere('"order"."startTime" <= NOW()')
              .addOrderBy('"order"."endTime"', 'ASC')
              .addOrderBy('"order"."marketplace"', 'ASC'), // TODO: Order by highest bid
          'auction',
          '"auction"."collectionAddress" = "balance"."collectionAddress" AND "balance"."tokenId"::TEXT = ANY("auction"."tokenIds")',
        )
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
        .leftJoin(
          (q) =>
            q
              .from(TransferEntity, 'transfer')
              .select()
              .where(
                `
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
                )`,
              )
              .orderBy('"transfer"."collectionAddress"')
              .addOrderBy('"transfer"."tokenId"')
              .addOrderBy('"timestamp"', 'ASC'),
          'mint',
          '"mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"',
        )
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
        .addSelect(
          (q) =>
            q
              .fromDummy()
              .select(
                `EXISTS ${q
                  .subQuery()
                  .from(HiddenItem, 'hidden')
                  .select('1')
                  .where('"hidden"."userAddress" = "balance"."userAddress"')
                  .andWhere(
                    '"hidden"."collectionAddress" = "balance"."collectionAddress"',
                  )
                  .andWhere('"hidden"."tokenId" = "balance"."tokenId"')
                  .getQuery()}`,
              ),
          'hidden',
        )
        .addSelect('"item"."rarityScore"', 'rarityScore')
        .addSelect(
          'CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END',
          'rarityBasisPoints',
        )
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
        .addSelect(
          (q) =>
            q
              .from(LikeEntity, 'like')
              .select('COUNT(*)')
              .where(
                '"like"."collectionAddress" = "balance"."collectionAddress"',
              )
              .andWhere('"like"."tokenId" = "balance"."tokenId"'),
          'likeCount',
        )

        // Some LEFT JOINs could return several rows, so we deduplicate results here
        .distinctOn([
          '"balance"."collectionAddress"',
          '"balance"."tokenId"',
          '"balance"."userAddress"',
        ])
        .orderBy('"balance"."collectionAddress"')
        .addOrderBy('"balance"."tokenId"')
        .addOrderBy('"balance"."userAddress"')
    );
  },
  name: 'balances_view',
})
export class Balance extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  @ViewColumn()
  tokenId!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  balance!: string;
}
