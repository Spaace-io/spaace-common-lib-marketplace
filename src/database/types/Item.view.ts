import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import {
  BaseEntity,
  Brackets,
  DataSource,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import { Transform } from 'class-transformer';
import {
  ActiveOrderCachedEntity,
  CollectionRankingCached,
  ItemEntity,
  LikeEntity,
  OrderItemEntity,
  SaleEntity,
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
        .from(ItemEntity, 'item')

        .leftJoin(
          CollectionRankingCached,
          'collection',
          '"collection"."address" = "item"."collectionAddress"',
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
              .where(
                `"order"."type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}')`,
              )
              .andWhere(
                `"order"."currency" IN ('${utils
                  .strip0x(utils.constants.ETH_TOKENS)
                  .join("','")}')`,
              )
              .andWhere(
                new Brackets((query) =>
                  query
                    .where('"order"."endTime" > NOW()')
                    .orWhere('"order"."endTime" IS NULL'),
                ),
              )
              .distinctOn(['"order"."hash"'])
              .orderBy('"order"."hash"')
              // .distinctOn(['"order"."collectionAddress"', '"order"."tokenIds"'])
              // .orderBy('"order"."collectionAddress"')
              // .addOrderBy('"order"."tokenIds"')
              .addOrderBy(
                `CASE WHEN "order"."type" = '${OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."perUnitPrice" END`,
                'ASC',
              )
              .addOrderBy('"order"."marketplace"', 'ASC'),
          'buyNow',
          '"buyNow"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId"::TEXT = ANY("buyNow"."tokenIds")',
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
              .andWhere(
                new Brackets((query) =>
                  query
                    .where('"order"."endTime" > NOW()')
                    .orWhere('"order"."endTime" IS NULL'),
                ),
              )
              .distinctOn(['"order"."hash"'])
              .orderBy('"order"."hash"')
              // .distinctOn(['"order"."collectionAddress"', '"order"."tokenIds"'])
              // .orderBy('"order"."collectionAddress"')
              // .addOrderBy('"order"."tokenIds"')
              .addOrderBy('"order"."perUnitPrice"', 'DESC')
              .addOrderBy('"order"."marketplace"', 'ASC'),
          'sellNow',
          '"sellNow"."collectionAddress" = "item"."collectionAddress" AND ("item"."tokenId"::TEXT = ANY("sellNow"."tokenIds") OR "sellNow"."tokenIds" IS NULL)',
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
              .andWhere(
                new Brackets((query) =>
                  query
                    .where('"order"."endTime" > NOW()')
                    .orWhere('"order"."endTime" IS NULL'),
                ),
              )
              .distinctOn(['"order"."hash"'])
              .orderBy('"order"."hash"')
              // .distinctOn(['"order"."collectionAddress"', '"order"."tokenIds"'])
              // .orderBy('"order"."collectionAddress"')
              // .addOrderBy('"order"."tokenIds"')
              .addOrderBy('"order"."endTime"', 'ASC')
              .addOrderBy('"order"."marketplace"', 'ASC'), // TODO: Order by highest bid
          'auction',
          '"auction"."collectionAddress" = "item"."collectionAddress" AND "item"."tokenId"::TEXT = ANY("auction"."tokenIds")',
        )
        .leftJoin(
          (q) =>
            q
              .from(SaleEntity, 'sale')
              .select()
              .distinctOn(['"sale"."collectionAddress"', '"sale"."tokenId"'])
              .orderBy('"sale"."collectionAddress"')
              .addOrderBy('"sale"."tokenId"')
              .addOrderBy('"timestamp"', 'DESC'),
          'lastSale',
          '"lastSale"."collectionAddress" = "item"."collectionAddress" AND "lastSale"."tokenId" = "item"."tokenId"',
        )
        .leftJoin(
          (q) =>
            q
              .from(TransferEntity, 'transfer')
              .select()
              .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
              ])
              .orderBy('"transfer"."collectionAddress"')
              .addOrderBy('"transfer"."tokenId"')
              .addOrderBy('"timestamp"', 'ASC'),
          'mint',
          '"mint"."collectionAddress" = "item"."collectionAddress" AND "mint"."tokenId" = "item"."tokenId"',
        )
        .leftJoin(
          (q) =>
            q
              .from(TransferEntity, 'transfer')
              .select()
              .distinctOn([
                '"transfer"."collectionAddress"',
                '"transfer"."tokenId"',
              ])
              .orderBy('"transfer"."collectionAddress"')
              .addOrderBy('"transfer"."tokenId"')
              .addOrderBy('"timestamp"', 'DESC'),
          'lastTransfer',
          '"lastTransfer"."collectionAddress" = "item"."collectionAddress" AND "lastTransfer"."tokenId" = "item"."tokenId"',
        )

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
        .addSelect(
          'CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END',
          'rarityBasisPoints',
        )
        .addSelect(
          `CASE WHEN "buyNow"."type" = '${OrderType.DUTCH_AUCTION}' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END`,
          'buyNowPrice',
        )
        .addSelect(
          `CASE WHEN "buyNow"."type" = '${OrderType.DUTCH_AUCTION}' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."perUnitPrice") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."perUnitPrice" END`,
          'buyNowPerUnitPrice',
        )
        .addSelect('"buyNow"."startTime"', 'buyNowStartTime')
        .addSelect('"sellNow"."price"', 'sellNowPrice')
        .addSelect('"sellNow"."perUnitPrice"', 'sellNowPerUnitPrice')
        .addSelect('"sellNow"."startTime"', 'sellNowStartTime')
        .addSelect(
          'CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."perUnitPrice", "auction"."perUnitPrice") ELSE NULL END',
          'auctionPerUnitPrice',
        )
        .addSelect(
          'CASE WHEN "auction"."hash" IS NOT NULL THEN GREATEST("sellNow"."price", "auction"."price") ELSE NULL END',
          'auctionPrice',
        )
        .addSelect('"auction"."endTime"', 'auctionEndTime')
        .addSelect('"lastSale"."price"', 'lastSalePrice')
        .addSelect('"lastSale"."timestamp"', 'lastSaleTimestamp')
        .addSelect('"mint"."timestamp"', 'mintTimestamp')
        .addSelect('"lastTransfer"."timestamp"', 'lastTransferTimestamp')
        .addSelect(
          (q) =>
            q
              .from(LikeEntity, 'like')
              .select('COUNT(*)')
              .where('"like"."collectionAddress" = "item"."collectionAddress"')
              .andWhere('"like"."tokenId" = "item"."tokenId"'),
          'likeCount',
        )

        // Some LEFT JOINs could return several rows, so we deduplicate results here
        .distinctOn(['"item"."collectionAddress"', '"item"."tokenId"'])
        .orderBy('"item"."collectionAddress"')
        .addOrderBy('"item"."tokenId"')
        .addOrderBy('"sellNow"."perUnitPrice"', 'DESC')
    );
  },
  name: 'items_view',
})
export class Item extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  @ViewColumn()
  tokenId!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  title!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  description!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  tokenUri!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  decimals!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  rarityRanking!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  rarityScore!: string | null;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  lastImport!: Date | null;
}
