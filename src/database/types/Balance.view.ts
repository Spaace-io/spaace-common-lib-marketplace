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
  ActiveOrderCached,
  BalanceEntity,
  CollectionRankingCached,
  HiddenItem,
  ItemEntity,
  LikeEntity,
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
        .from(BalanceEntity, 'balance')

        .leftJoin(
          CollectionRankingCached,
          'collection',
          '"collection"."address" = "balance"."collectionAddress"',
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
              .andWhere(
                new Brackets((query) =>
                  query
                    .where('"order"."endTime" > NOW()')
                    .orWhere('"order"."endTime" IS NULL'),
                ),
              )
              .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
              .orderBy('"order"."collectionAddress"')
              .addOrderBy('"order"."tokenId"')
              .addOrderBy(
                `CASE WHEN "order"."type" = '${OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM NOW() - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END`,
                'ASC',
              ),
          'buyNow',
          '"buyNow"."collectionAddress" = "balance"."collectionAddress" AND "buyNow"."tokenId" = "balance"."tokenId"',
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
              .andWhere(
                new Brackets((query) =>
                  query
                    .where('"order"."endTime" > NOW()')
                    .orWhere('"order"."endTime" IS NULL'),
                ),
              )
              .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
              .orderBy('"order"."collectionAddress"')
              .addOrderBy('"order"."tokenId"')
              .addOrderBy('"order"."price"', 'DESC'),
          'sellNow',
          '"sellNow"."collectionAddress" = "balance"."collectionAddress" AND ("sellNow"."tokenId" = "balance"."tokenId" OR "sellNow"."tokenId" IS NULL)',
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
              .andWhere(
                new Brackets((query) =>
                  query
                    .where('"order"."endTime" > NOW()')
                    .orWhere('"order"."endTime" IS NULL'),
                ),
              )
              .distinctOn(['"order"."collectionAddress"', '"order"."tokenId"'])
              .orderBy('"order"."collectionAddress"')
              .addOrderBy('"order"."tokenId"')
              .addOrderBy('"order"."endTime"', 'ASC'), // TODO: Order by highest bid
          'auction',
          '"auction"."collectionAddress" = "balance"."collectionAddress" AND "auction"."tokenId" = "balance"."tokenId"',
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
          '"lastSale"."collectionAddress" = "balance"."collectionAddress" AND "lastSale"."tokenId" = "balance"."tokenId"',
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
          '"mint"."collectionAddress" = "balance"."collectionAddress" AND "mint"."tokenId" = "balance"."tokenId"',
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
          '"lastTransfer"."collectionAddress" = "balance"."collectionAddress" AND "lastTransfer"."tokenId" = "balance"."tokenId"',
        )

        .select('"balance"."collectionAddress"', 'collectionAddress')
        .addSelect('"balance"."tokenId"', 'tokenId')
        .addSelect('"balance"."userAddress"', 'userAddress')
        .addSelect('"balance"."balance"', 'balance')
        .where('"balance"."balance" > 0')

        // Used for searching
        .addSelect(
          (q) =>
            q
              .from(ItemEntity, 'item')
              .select('"item"."description"')
              .where(
                '"item"."collectionAddress" = "balance"."collectionAddress"',
              )
              .andWhere('"item"."tokenId" = "balance"."tokenId"'),
          'description',
        )
        .addSelect(
          (q) =>
            q
              .from(ItemEntity, 'item')
              .select('"item"."title"')
              .where(
                '"item"."collectionAddress" = "balance"."collectionAddress"',
              )
              .andWhere('"item"."tokenId" = "balance"."tokenId"'),
          'title',
        )

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
        .addSelect(
          (q) =>
            q
              .from(ItemEntity, 'item')
              .select('"item"."rarityScore"')
              .where(
                '"item"."collectionAddress" = "balance"."collectionAddress"',
              )
              .andWhere('"item"."tokenId" = "balance"."tokenId"'),
          'rarityScore',
        )
        .addSelect(
          (q) =>
            q
              .from(ItemEntity, 'item')
              .select(
                'CASE WHEN "item"."rarityRanking" IS NOT NULL AND "collection"."totalSupply" > 0 THEN 10000 - "item"."rarityRanking" * 10000 / "collection"."totalSupply" ELSE NULL END',
              )
              .where(
                '"item"."collectionAddress" = "balance"."collectionAddress"',
              )
              .andWhere('"item"."tokenId" = "balance"."tokenId"'),
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
