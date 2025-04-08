import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import {
  CollectionEntity,
  CollectionLink,
  CollectionType,
  CollectionRankingCached,
  NotableCollection,
  ItemEntity,
  OrderType,
} from '..';
import { utils } from '../..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .from(CollectionEntity, 'collection')
      .leftJoin(
        CollectionRankingCached,
        'ranking',
        '"ranking"."address" = "collection"."address"',
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
        '"sales_volume"."collectionAddress" = "collection"."address"',
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
        '"sales_volume_1h"."collectionAddress" = "collection"."address"',
      )
      .leftJoin(
        (qb) =>
          qb
            .from('sales', 'sales')
            .select('"collectionAddress"')
            .addSelect('SUM("perUnitPrice")', 'previousVolume1h')
            .addSelect('SUM("amount")', 'previousSaleCount1h')
            .where(
              "\"timestamp\" >= NOW() - INTERVAL '1 hour' - INTERVAL '1 hour'",
            )
            .andWhere('"timestamp" < NOW() - INTERVAL \'1 hour\'')
            .groupBy('"collectionAddress"'),
        'sales_volume_1h_prev',
        '"sales_volume_1h_prev"."collectionAddress" = "collection"."address"',
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
        '"sales_volume_6h"."collectionAddress" = "collection"."address"',
      )
      .leftJoin(
        (qb) =>
          qb
            .from('sales', 'sales_volume_6h')
            .select('"collectionAddress"')
            .addSelect('SUM("perUnitPrice")', 'previousVolume6h')
            .addSelect('SUM("amount")', 'previousSaleCount6h')
            .where(
              "\"timestamp\" >= NOW() - INTERVAL '6 hour' - INTERVAL '6 hour'",
            )
            .andWhere('"timestamp" < NOW() - INTERVAL \'6 hour\'')
            .groupBy('"collectionAddress"'),
        'sales_volume_6h_prev',
        '"sales_volume_6h_prev"."collectionAddress" = "collection"."address"',
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
        '"sales_volume_1d"."collectionAddress" = "collection"."address"',
      )
      .leftJoin(
        (qb) =>
          qb
            .from('sales_volume_1d', 'sales_volume_1d')
            .select('"collectionAddress"')
            .addSelect('"volume"', 'previousVolume24h')
            .addSelect('"saleCount"', 'previousSaleCount24h')
            .where(
              "\"bucket_1d\" >= NOW() - INTERVAL '1 day' - INTERVAL '1 day'",
            )
            .andWhere('"bucket_1d" < NOW() - INTERVAL \'1 day\''),
        'sales_volume_1d_prev',
        '"sales_volume_1d_prev"."collectionAddress" = "collection"."address"',
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
        '"sales_volume_7d"."collectionAddress" = "collection"."address"',
      )
      .leftJoin(
        (qb) =>
          qb
            .from('sales_volume_1d', 'sales_volume_7d')
            .select('"collectionAddress"')
            .addSelect('SUM("volume")', 'previousVolume7d')
            .addSelect('SUM("saleCount")', 'previousSaleCount7d')
            .where(
              "\"bucket_1d\" >= NOW() - INTERVAL '7 day' - INTERVAL '7 day'",
            )
            .andWhere('"bucket_1d" < NOW() - INTERVAL \'7 day\'')
            .groupBy('"collectionAddress"'),
        'sales_volume_7d_prev',
        '"sales_volume_7d_prev"."collectionAddress" = "collection"."address"',
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
        '"sales_volume_30d"."collectionAddress" = "collection"."address"',
      )
      .leftJoin(
        (qb) =>
          qb
            .from('sales_volume_1d', 'sales_volume_30d')
            .select('"collectionAddress"')
            .addSelect('SUM("volume")', 'previousVolume30d')
            .addSelect('SUM("saleCount")', 'previousSaleCount30d')
            .where(
              "\"bucket_1d\" >= NOW() - INTERVAL '30 day' - INTERVAL '30 day'",
            )
            .andWhere('"bucket_1d" < NOW() - INTERVAL \'30 day\'')
            .groupBy('"collectionAddress"'),
        'sales_volume_30d_prev',
        '"sales_volume_30d_prev"."collectionAddress" = "collection"."address"',
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
        '"sales_volume_90d"."collectionAddress" = "collection"."address"',
      )
      .leftJoin(
        (qb) =>
          qb
            .from('sales_volume_90d', 'sales_volume_90d')
            .select('"collectionAddress"')
            .addSelect('"volume"', 'previousVolume90d')
            .addSelect('"saleCount"', 'previousSaleCount90d')
            .where(
              "\"bucket_90d\" >= NOW() - INTERVAL '90 day' - INTERVAL '90 day'",
            )
            .andWhere('"bucket_90d" < NOW() - INTERVAL \'90 day\''),
        'sales_volume_90d_prev',
        '"sales_volume_90d_prev"."collectionAddress" = "collection"."address"',
      )
      .leftJoin(
        (qb) =>
          qb
            .from('active_orders_cache_view', 'order')
            .select('"collectionAddress"')
            .addSelect(
              `MIN(
                CASE
                  WHEN "order"."type" = '${OrderType.DUTCH_AUCTION}' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."perUnitPrice") * EXTRACT(
                    EPOCH
                    FROM
                      NOW() - "order"."startTime"
                  ) / EXTRACT(
                    EPOCH
                    FROM
                      "order"."endTime" - "order"."startTime"
                  )
                  ELSE "order"."perUnitPrice"
                END
              )`,
              'floorPrice',
            )
            .where('"order"."endTime" >= NOW() OR "order"."endTime" IS NULL')
            .andWhere(
              `"order"."currency" IN ('${utils
                .strip0x(utils.constants.ETH_TOKENS)
                .join("','")}')`,
            )
            .andWhere(
              `"order"."type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}', '${OrderType.ENGLISH_AUCTION}')`,
            )
            .andWhere('"order"."remainingQuantity" > 0')
            .groupBy('"collectionAddress"'),
        'floor_price',
        '"floor_price"."collectionAddress" = "collection"."address"',
      )
      .select('"collection"."address"', 'address')
      .addSelect('"collection"."type"', 'type')
      .addSelect('"collection"."name"', 'name')
      .addSelect('"collection"."symbol"', 'symbol')
      .addSelect('"collection"."imageUrl"', 'imageUrl')
      .addSelect('"collection"."active"', 'active')
      .addSelect('"collection"."verified"', 'verified')
      .addSelect('"collection"."explicit"', 'explicit')
      .addSelect('"collection"."bannerUrl"', 'bannerUrl')
      .addSelect('"collection"."description"', 'description')
      .addSelect('"collection"."deployedAt"', 'deployedAt')
      .addSelect('"collection"."deployer"', 'deployer')
      .addSelect('"collection"."links"', 'links')
      .addSelect('"collection"."lastImport"', 'lastImport')
      .addSelect('floor_price."floorPrice"', 'floorPrice')
      .addSelect('0', 'previousFloorPrice1h')
      .addSelect('0', 'previousFloorPrice6h')
      .addSelect('0', 'previousFloorPrice24h')
      .addSelect('0', 'previousFloorPrice7d')
      .addSelect('0', 'previousFloorPrice30d')
      .addSelect('0', 'previousFloorPrice90d')
      .addSelect('COALESCE(sales_volume."volume", 0)', 'volume')
      .addSelect('COALESCE(sales_volume."saleCount", 0)', 'saleCount')
      .addSelect('COALESCE(sales_volume_1h."volume1h", 0)', 'volume1h')
      .addSelect('COALESCE(sales_volume_1h."saleCount1h", 0)', 'saleCount1h')
      .addSelect(
        'COALESCE(sales_volume_1h_prev."previousVolume1h", 0)',
        'previousVolume1h',
      )
      .addSelect(
        'COALESCE(sales_volume_1h_prev."previousSaleCount1h", 0)',
        'previousSaleCount1h',
      )
      .addSelect('COALESCE(sales_volume_6h."volume6h", 0)', 'volume6h')
      .addSelect('COALESCE(sales_volume_6h."saleCount6h", 0)', 'saleCount6h')
      .addSelect(
        'COALESCE(sales_volume_6h_prev."previousVolume6h", 0)',
        'previousVolume6h',
      )
      .addSelect(
        'COALESCE(sales_volume_6h_prev."previousSaleCount6h", 0)',
        'previousSaleCount6h',
      )
      .addSelect('COALESCE(sales_volume_1d."volume24h", 0)', 'volume24h')
      .addSelect('COALESCE(sales_volume_1d."saleCount24h", 0)', 'saleCount24h')
      .addSelect(
        'COALESCE(sales_volume_1d_prev."previousVolume24h", 0)',
        'previousVolume24h',
      )
      .addSelect(
        'COALESCE(sales_volume_1d_prev."previousSaleCount24h", 0)',
        'previousSaleCount24h',
      )
      .addSelect('COALESCE(sales_volume_7d."volume7d", 0)', 'volume7d')
      .addSelect('COALESCE(sales_volume_7d."saleCount7d", 0)', 'saleCount7d')
      .addSelect(
        'COALESCE(sales_volume_7d_prev."previousVolume7d", 0)',
        'previousVolume7d',
      )
      .addSelect(
        'COALESCE(sales_volume_7d_prev."previousSaleCount7d", 0)',
        'previousSaleCount7d',
      )
      .addSelect('COALESCE(sales_volume_30d."volume30d", 0)', 'volume30d')
      .addSelect('COALESCE(sales_volume_30d."saleCount30d", 0)', 'saleCount30d')
      .addSelect(
        'COALESCE(sales_volume_30d_prev."previousVolume30d", 0)',
        'previousVolume30d',
      )
      .addSelect(
        'COALESCE(sales_volume_30d_prev."previousSaleCount30d", 0)',
        'previousSaleCount30d',
      )
      .addSelect('COALESCE(sales_volume_90d."volume90d", 0)', 'volume90d')
      .addSelect('COALESCE(sales_volume_90d."saleCount90d", 0)', 'saleCount90d')
      .addSelect(
        'COALESCE(sales_volume_90d_prev."previousVolume90d", 0)',
        'previousVolume90d',
      )
      .addSelect(
        'COALESCE(sales_volume_90d_prev."previousSaleCount90d", 0)',
        'previousSaleCount90d',
      )
      .addSelect('COALESCE("ranking"."totalSupply", 0)', 'totalSupply')
      .addSelect('COALESCE("ranking"."ownerCount", 0)', 'ownerCount')
      .addSelect('COALESCE("ranking"."listedCount", 0)', 'listedCount')
      .addSelect(
        (query) =>
          query
            .fromDummy()
            .select(
              `EXISTS ${query
                .subQuery()
                .select('1')
                .from(NotableCollection, 'notable')
                .where('"notable"."collectionAddress" = "collection"."address"')
                .getQuery()}`,
            ),
        'notable',
      )
      .addSelect(
        (query) =>
          query
            .from(ItemEntity, 'item')
            .select('MAX("item"."rarityRanking") as "maxRarityRanking"')
            .where('"item"."collectionAddress" = "collection"."address"'),
        'maxRarityRanking',
      ),
  name: 'collections_view',
})
export class Collection extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => CollectionType)
  @ViewColumn()
  type!: CollectionType;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  name!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  symbol!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  imageUrl!: string | null;

  @Field(() => Boolean)
  @ViewColumn()
  active!: boolean;

  @Field(() => Boolean)
  @ViewColumn()
  verified!: boolean;

  @Field(() => Boolean)
  @ViewColumn()
  explicit!: boolean;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  bannerUrl!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  description!: string | null;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  deployedAt!: Date | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) => (value !== null ? ethers.utils.getAddress(value) : null),
    {
      toPlainOnly: true,
    },
  )
  deployer!: string | null;

  @Field(() => [CollectionLink])
  @ViewColumn()
  @Type(() => CollectionLink)
  @ValidateNested({ each: true })
  links!: CollectionLink[];

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  lastImport!: Date | null;

  // Cached columns

  @Field(() => String)
  @ViewColumn()
  volume!: string;

  @Field(() => String)
  @ViewColumn()
  volume1h!: string;

  @Field(() => String)
  @ViewColumn()
  volume6h!: string;

  @Field(() => String)
  @ViewColumn()
  volume24h!: string;

  @Field(() => String)
  @ViewColumn()
  volume7d!: string;

  @Field(() => String)
  @ViewColumn()
  volume30d!: string;

  @Field(() => String)
  @ViewColumn()
  volume90d!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume1h!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume6h!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume24h!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume7d!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume30d!: string;

  @Field(() => String)
  @ViewColumn()
  previousVolume90d!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  floorPrice!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice1h!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice6h!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice24h!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice7d!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice30d!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  previousFloorPrice90d!: string | null;

  @Field(() => String)
  @ViewColumn()
  saleCount!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount1h!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount6h!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount24h!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount7d!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount30d!: string;

  @Field(() => String)
  @ViewColumn()
  saleCount90d!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount1h!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount6h!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount24h!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount7d!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount30d!: string;

  @Field(() => String)
  @ViewColumn()
  previousSaleCount90d!: string;

  @Field(() => String)
  @ViewColumn()
  totalSupply!: string;

  @Field(() => String)
  @ViewColumn()
  ownerCount!: string;

  @Field(() => String)
  @ViewColumn()
  listedCount!: string;

  @Field(() => Boolean)
  @ViewColumn()
  notable!: boolean;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  maxRarityRanking!: string | null;
}
