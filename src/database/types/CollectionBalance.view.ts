import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { BalanceEntity, CollectionEntity, CollectionRankingCached } from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return (
      dataSource
        .createQueryBuilder()
        .from(
          (q) =>
            q
              .subQuery()
              .from(BalanceEntity, 'balance')
              .select('"balance"."collectionAddress"', 'collectionAddress')
              .addSelect('"balance"."userAddress"', 'userAddress')
              .addSelect('SUM("balance"."balance")', 'balance')
              .addSelect('COUNT(DISTINCT "balance"."tokenId")', 'itemCount')
              .where('"balance"."balance" > 0')
              .groupBy('"balance"."collectionAddress"')
              .addGroupBy('"balance"."userAddress"'),
          'balance',
        )

        .leftJoin(
          CollectionRankingCached,
          'collection',
          '"collection"."address" = "balance"."collectionAddress"',
        )

        .select('"balance"."collectionAddress"', 'collectionAddress')
        .addSelect('"balance"."userAddress"', 'userAddress')
        .addSelect('"balance"."balance"', 'balance')
        .addSelect('"balance"."itemCount"', 'itemCount')

        // Used for searching
        .addSelect(
          (q) =>
            q
              .from(CollectionEntity, 'collection')
              .select('"collection"."description"')
              .where('"collection"."address" = "balance"."collectionAddress"'),
          'description',
        )
        .addSelect(
          (q) =>
            q
              .from(CollectionEntity, 'collection')
              .select('"collection"."name"')
              .where('"collection"."address" = "balance"."collectionAddress"'),
          'name',
        )

        // Used for sorting/filtering, but not included in the GraphQL output
        .addSelect('COALESCE("collection"."volume", 0)', 'volume')
        .addSelect('COALESCE("collection"."volume1h", 0)', 'volume1h')
        .addSelect('COALESCE("collection"."volume6h", 0)', 'volume6h')
        .addSelect('COALESCE("collection"."volume24h", 0)', 'volume24h')
        .addSelect('COALESCE("collection"."volume7d", 0)', 'volume7d')
        .addSelect('COALESCE("collection"."volume30d", 0)', 'volume30d')
        .addSelect('COALESCE("collection"."volume90d", 0)', 'volume90d')
    );
  },
  name: 'collection_balances_view',
})
export class CollectionBalance extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  balance!: string;

  @Field(() => String)
  @ViewColumn()
  itemCount!: string;
}
