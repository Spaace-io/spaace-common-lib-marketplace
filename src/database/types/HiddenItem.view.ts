import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import {
  ActiveOrderCached,
  CollectionRankingCached,
  ItemEntity,
  HiddenItemEntity,
  OrderType,
  SaleEntity,
  TransferEntity,
  Like,
} from '..';
import { utils } from '../..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return (
      dataSource
        .createQueryBuilder()
        .from(HiddenItemEntity, 'hidden')

        .leftJoin(
          CollectionRankingCached,
          'collection',
          '"collection"."address" = "hidden"."collectionAddress"',
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
          '"buyNow"."collectionAddress" = "hidden"."collectionAddress" AND "buyNow"."tokenId" = "hidden"."tokenId"',
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
          '"sellNow"."collectionAddress" = "hidden"."collectionAddress" AND ("sellNow"."tokenId" = "hidden"."tokenId" OR "sellNow"."tokenId" IS NULL)',
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
          '"auction"."collectionAddress" = "hidden"."collectionAddress" AND "auction"."tokenId" = "hidden"."tokenId"',
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
          '"lastSale"."collectionAddress" = "hidden"."collectionAddress" AND "lastSale"."tokenId" = "hidden"."tokenId"',
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
          '"mint"."collectionAddress" = "hidden"."collectionAddress" AND "mint"."tokenId" = "hidden"."tokenId"',
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
          '"lastTransfer"."collectionAddress" = "hidden"."collectionAddress" AND "lastTransfer"."tokenId" = "hidden"."tokenId"',
        )

        .select('"hidden"."collectionAddress"', 'collectionAddress')
        .addSelect('"hidden"."tokenId"', 'tokenId')
        .addSelect('"hidden"."userAddress"', 'userAddress')

        // Used for searching
        .addSelect(
          (q) =>
            q
              .from(ItemEntity, 'item')
              .select('"item"."description"')
              .where(
                '"item"."collectionAddress" = "hidden"."collectionAddress"',
              )
              .andWhere('"item"."tokenId" = "hidden"."tokenId"'),
          'description',
        )
        .addSelect(
          (q) =>
            q
              .from(ItemEntity, 'item')
              .select('"item"."title"')
              .where(
                '"item"."collectionAddress" = "hidden"."collectionAddress"',
              )
              .andWhere('"item"."tokenId" = "hidden"."tokenId"'),
          'title',
        )

        // Used for sorting/filtering, but not included in the GraphQL output
        .addSelect(
          (q) =>
            q
              .from(ItemEntity, 'item')
              .select(
                'CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END',
              )
              .where(
                '"item"."collectionAddress" = "hidden"."collectionAddress"',
              )
              .andWhere('"item"."tokenId" = "hidden"."tokenId"'),
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
              .where(
                '"like"."collectionAddress" = "hidden"."collectionAddress"',
              )
              .andWhere('"like"."tokenId" = "hidden"."tokenId"'),
          'likeCount',
        )

        // Some LEFT JOINs could return several rows, so we deduplicate results here
        .distinctOn([
          '"hidden"."collectionAddress"',
          '"hidden"."tokenId"',
          '"hidden"."userAddress"',
        ])
        .orderBy('"hidden"."collectionAddress"')
        .addOrderBy('"hidden"."tokenId"')
        .addOrderBy('"hidden"."userAddress"')
        .addOrderBy('"sellNow"."price"', 'DESC')
    );
  },
  name: 'hidden_items_view',
})
export class HiddenItem extends BaseEntity {
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
}
