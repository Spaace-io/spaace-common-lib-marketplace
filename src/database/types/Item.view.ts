import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import {
  ActiveOrderCached,
  CollectionRankingCached,
  ItemEntity,
  Like,
  OrderType,
  SaleEntity,
  TransferEntity,
} from '..';
import { utils } from '../..';

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
              .from(ActiveOrderCached, 'order')
              .select()
              .where(
                `"order"."type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}')`,
              )
              .andWhere(
                `"order"."currency" IN ('${utils
                  .strip0x(utils.constants.ETH_TOKENS)
                  .join("','")}')`,
              )
              .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
              .orderBy('"order"."collectionAddress"')
              .addOrderBy('"order"."tokenId"')
              .addOrderBy(
                `CASE WHEN "order"."type" = '${OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END`,
                'ASC',
              ),
          'buyNow',
          '"buyNow"."collectionAddress" = "item"."collectionAddress" AND "buyNow"."tokenId" = "item"."tokenId"',
        )
        .leftJoin(
          (q) =>
            q
              .from(ActiveOrderCached, 'order')
              .select()
              .where(`"order"."type" = '${OrderType.BID}'`)
              .andWhere(
                `"order"."currency" IN ('${utils
                  .strip0x(utils.constants.ETH_TOKENS)
                  .join("','")}')`,
              )
              .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
              .orderBy('"order"."collectionAddress"')
              .addOrderBy('"order"."tokenId"')
              .addOrderBy('"order"."price"', 'DESC'),
          'sellNow',
          '"sellNow"."collectionAddress" = "item"."collectionAddress" AND ("sellNow"."tokenId" = "item"."tokenId" OR "sellNow"."tokenId" IS NULL)',
        )
        .leftJoin(
          (q) =>
            q
              .from(ActiveOrderCached, 'order')
              .select()
              .where(`"order"."type" = '${OrderType.ENGLISH_AUCTION}'`)
              .andWhere(
                `"order"."currency" IN ('${utils
                  .strip0x(utils.constants.ETH_TOKENS)
                  .join("','")}')`,
              )
              .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
              .orderBy('"order"."collectionAddress"')
              .addOrderBy('"order"."tokenId"')
              .addOrderBy('"order"."endTime"', 'ASC'), // TODO: Order by highest bid
          'auction',
          '"auction"."collectionAddress" = "item"."collectionAddress" AND "auction"."tokenId" = "item"."tokenId"',
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
          `CASE WHEN "buyNow"."type" = '${OrderType.DUTCH_AUCTION}' THEN "buyNow"."startingPrice" - ("buyNow"."startingPrice" - "buyNow"."price") * EXTRACT(EPOCH FROM NOW() - "buyNow"."startTime") / EXTRACT(EPOCH FROM "buyNow"."endTime" - "buyNow"."startTime") ELSE "buyNow"."price" END`,
          'buyNowPrice',
        )
        .addSelect('"buyNow"."startTime"', 'buyNowStartTime')
        .addSelect('"sellNow"."price"', 'sellNowPrice')
        .addSelect('"sellNow"."startTime"', 'sellNowStartTime')
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
              .from(Like, 'like')
              .select('COUNT(*)')
              .where('"like"."collectionAddress" = "item"."collectionAddress"')
              .andWhere('"like"."tokenId" = "item"."tokenId"'),
          'likeCount',
        )

        // Some LEFT JOINs could return several rows, so we deduplicate results here
        .distinctOn(['"item"."collectionAddress"', '"item"."tokenId"'])
        .orderBy('"item"."collectionAddress"')
        .addOrderBy('"item"."tokenId"')
        .addOrderBy('"sellNow"."price"', 'DESC')
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
