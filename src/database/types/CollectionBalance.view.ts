import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { BalanceEntity, CollectionEntity } from '..';

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
          (qb) =>
            qb
              .from('sales_volume_10y', 'sales')
              .select('"collectionAddress"')
              .addSelect('SUM("volume")', 'volume')
              .addSelect('SUM("saleCount")', 'saleCount')
              .groupBy('"collectionAddress"'),
          'sales_volume',
          '"sales_volume"."collectionAddress" = "balance"."collectionAddress"',
        )
        .leftJoin(
          (qb) =>
            qb
              .from('sales', 'sales')
              .select('"collectionAddress"')
              .addSelect('SUM("perUnitPrice")', 'volume1h')
              .addSelect('SUM("amount")', 'saleCount1h')
              .where('"timestamp" >= NOW() - INTERVAL \'1 hour\'')
              .groupBy('"collectionAddress"'),
          'sales_volume_1h',
          '"sales_volume_1h"."collectionAddress" = "balance"."collectionAddress"',
        )
        .leftJoin(
          (qb) =>
            qb
              .from('sales', 'sales_volume_6h')
              .select('"collectionAddress"')
              .addSelect('SUM("perUnitPrice")', 'volume6h')
              .addSelect('SUM("amount")', 'saleCount6h')
              .where('"timestamp" >= NOW() - INTERVAL \'6 hour\'')
              .groupBy('"collectionAddress"'),
          'sales_volume_6h',
          '"sales_volume_6h"."collectionAddress" = "balance"."collectionAddress"',
        )
        .leftJoin(
          (qb) =>
            qb
              .from('sales_volume_1d', 'sales_volume_1d')
              .select('"collectionAddress"')
              .addSelect('"volume"', 'volume24h')
              .addSelect('"saleCount"', 'saleCount24h')
              .where('"bucket_1d" >= NOW() - INTERVAL \'1 day\''),
          'sales_volume_1d',
          '"sales_volume_1d"."collectionAddress" = "balance"."collectionAddress"',
        )
        .leftJoin(
          (qb) =>
            qb
              .from('sales_volume_1d', 'sales_volume_7d')
              .select('"collectionAddress"')
              .addSelect('SUM("volume")', 'volume7d')
              .addSelect('SUM("saleCount")', 'saleCount7d')
              .where('"bucket_1d" >= NOW() - INTERVAL \'7 day\'')
              .groupBy('"collectionAddress"'),
          'sales_volume_7d',
          '"sales_volume_7d"."collectionAddress" = "balance"."collectionAddress"',
        )
        .leftJoin(
          (qb) =>
            qb
              .from('sales_volume_1d', 'sales_volume_30d')
              .select('"collectionAddress"')
              .addSelect('SUM("volume")', 'volume30d')
              .addSelect('SUM("saleCount")', 'saleCount30d')
              .where('"bucket_1d" >= NOW() - INTERVAL \'30 day\'')
              .groupBy('"collectionAddress"'),
          'sales_volume_30d',
          '"sales_volume_30d"."collectionAddress" = "balance"."collectionAddress"',
        )
        .leftJoin(
          (qb) =>
            qb
              .from('sales_volume_90d', 'sales_volume_90d')
              .select('"collectionAddress"')
              .addSelect('"volume"', 'volume90d')
              .addSelect('"saleCount"', 'saleCount90d')
              .where('"bucket_90d" >= NOW() - INTERVAL \'90 day\''),
          'sales_volume_90d',
          '"sales_volume_90d"."collectionAddress" = "balance"."collectionAddress"',
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
              .where(
                '"balance"."collectionAddress" = "balance"."collectionAddress"',
              ),
          'description',
        )
        .addSelect(
          (q) =>
            q
              .from(CollectionEntity, 'collection')
              .select('"collection"."name"')
              .where(
                '"balance"."collectionAddress" = "balance"."collectionAddress"',
              ),
          'name',
        )

        // Used for sorting/filtering, but not included in the GraphQL output
        .addSelect('COALESCE(sales_volume."volume", 0)', 'volume')
        .addSelect('COALESCE(sales_volume_1h."volume1h", 0)', 'volume1h')
        .addSelect('COALESCE(sales_volume_1h."saleCount1h", 0)', 'saleCount1h')
        .addSelect('COALESCE(sales_volume_6h."volume6h", 0)', 'volume6h')
        .addSelect('COALESCE(sales_volume_6h."saleCount6h", 0)', 'saleCount6h')
        .addSelect('COALESCE(sales_volume_1d."volume24h", 0)', 'volume24h')
        .addSelect(
          'COALESCE(sales_volume_1d."saleCount24h", 0)',
          'saleCount24h',
        )
        .addSelect('COALESCE(sales_volume_7d."volume7d", 0)', 'volume7d')
        .addSelect('COALESCE(sales_volume_7d."saleCount7d", 0)', 'saleCount7d')
        .addSelect('COALESCE(sales_volume_30d."volume30d", 0)', 'volume30d')
        .addSelect(
          'COALESCE(sales_volume_30d."saleCount30d", 0)',
          'saleCount30d',
        )
        .addSelect('COALESCE(sales_volume_90d."volume90d", 0)', 'volume90d')
        .addSelect(
          'COALESCE(sales_volume_90d."saleCount90d", 0)',
          'saleCount90d',
        )
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
