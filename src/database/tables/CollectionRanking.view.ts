import { Field } from '@nestjs/graphql';
import {
  BaseEntity,
  Brackets,
  DataSource,
  Index,
  SelectQueryBuilder,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import { utils } from '../..';
import { ethers } from 'ethers';
import { BalanceEntity, CollectionEntity, OrderType, SaleEntity } from '.';
import { Order } from '../types';

function getVolumeQuery(interval: string, previous = false) {
  return (query: SelectQueryBuilder<object>) => {
    let subQuery = query
      .subQuery()
      .from(SaleEntity, 'sale')
      .select('SUM("sale"."price")')
      .where('"sale"."collectionAddress" = "collection"."address"')
      .andWhere(
        `"sale"."currency" IN ('${utils.strip0x(
          ethers.constants.AddressZero,
        )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
      );

    if (previous) {
      subQuery = subQuery
        .andWhere(`"sale"."timestamp" > NOW() - (INTERVAL '${interval}' * 2)`)
        .andWhere(`"sale"."timestamp" <= NOW() - INTERVAL '${interval}'`);
    } else {
      subQuery = subQuery.andWhere(
        `"sale"."timestamp" > NOW() - INTERVAL '${interval}'`,
      );
    }

    return query.fromDummy().select(`COALESCE(${subQuery.getQuery()}, 0)`);
  };
}

function getFloorPriceQuery(timestamp?: string) {
  return (query: SelectQueryBuilder<object>) => {
    query = query
      .from(Order, 'order')
      .select(
        `MIN(CASE WHEN "order"."type" = '${
          OrderType.DUTCH_AUCTION
        }' THEN "order"."startingPrice" - ("order"."startingPrice" - "order"."price") * EXTRACT(EPOCH FROM ${
          timestamp ?? 'NOW()'
        } - "order"."startTime") / EXTRACT(EPOCH FROM "order"."endTime" - "order"."startTime") ELSE "order"."price" END)`,
      )
      .where(
        `"order"."type" IN ('${OrderType.ASK}', '${OrderType.DUTCH_AUCTION}')`,
      )
      .andWhere('"order"."collectionAddress" = "collection"."address"')
      .andWhere(
        `"order"."currency" IN ('${utils.strip0x(
          ethers.constants.AddressZero,
        )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
      );

    if (timestamp === undefined) {
      query = query.andWhere('"order"."active"');
    } else {
      // Equivalent of "order"."active" but at timestamp instead of NOW()
      query = query
        .andWhere(`"order"."startTime" <= ${timestamp}`)
        .andWhere(
          new Brackets((query) =>
            query
              .where(`"order"."endTime" > ${timestamp}`)
              .orWhere('"order"."endTime" IS NULL'),
          ),
        )
        .andWhere('"order"."cancelTimestamp" IS NULL')
        .andWhere(
          `NOT EXISTS ${query
            .subQuery()
            .from(SaleEntity, 'sale')
            .where('"sale"."orderHash" = "order"."hash"')
            .getQuery()}`,
        )
        .andWhere(
          `"order"."currency" IN ('${utils.strip0x(
            ethers.constants.AddressZero,
          )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
        )
        .andWhereExists(
          query
            .subQuery()
            .select('"balance"."balance"')
            .from(BalanceEntity, 'balance')
            .where('"balance"."userAddress" = "order"."userAddress"')
            .andWhere(
              '"balance"."collectionAddress" = "order"."collectionAddress"',
            )
            .andWhere('"balance"."tokenId" = "order"."tokenId"')
            .andWhere('"balance"."balance" > 0'),
        );
    }

    return query;
  };
}

function getSaleCountQuery(interval: string) {
  return (query: SelectQueryBuilder<object>) =>
    query
      .from(SaleEntity, 'sale')
      .select('COUNT(*)')
      .where('"sale"."collectionAddress" = "collection"."address"')
      .andWhere(
        `"sale"."currency" IN ('${utils.strip0x(
          ethers.constants.AddressZero,
        )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
      )
      .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`);
}

@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(
        (q) =>
          q
            .from(CollectionEntity, 'collection')
            .select('"collection"."address"')
            .addSelect(
              (query) =>
                query
                  .from(SaleEntity, 'sale')
                  .select('SUM("sale"."price")')
                  .where('"sale"."collectionAddress" = "collection"."address"')
                  .andWhere(
                    `"sale"."currency" IN ('${utils.strip0x(
                      ethers.constants.AddressZero,
                    )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
                  ),
              'volume',
            )
            .addSelect(getVolumeQuery('1 hour'), 'volume1h')
            .addSelect(getVolumeQuery('6 hours'), 'volume6h')
            .addSelect(getVolumeQuery('1 day'), 'volume24h')
            .addSelect(getVolumeQuery('7 days'), 'volume7d')
            .addSelect(getVolumeQuery('30 days'), 'volume30d')
            .addSelect(getVolumeQuery('1 hour', true), 'volumePrevious1h')
            .addSelect(getVolumeQuery('6 hours', true), 'volumePrevious6h')
            .addSelect(getVolumeQuery('1 day', true), 'volumePrevious24h')
            .addSelect(getVolumeQuery('7 days', true), 'volumePrevious7d')
            .addSelect(getVolumeQuery('30 days', true), 'volumePrevious30d')
            .addSelect(getFloorPriceQuery(), 'floorPrice')
            .addSelect(
              getFloorPriceQuery("NOW() - INTERVAL '1 hour'"),
              'floorPrevious1h',
            )
            .addSelect(
              getFloorPriceQuery("NOW() - INTERVAL '6 hours'"),
              'floorPrevious6h',
            )
            .addSelect(
              getFloorPriceQuery("NOW() - INTERVAL '1 day'"),
              'floorPrevious24h',
            )
            .addSelect(
              getFloorPriceQuery("NOW() - INTERVAL '7 days'"),
              'floorPrevious7d',
            )
            .addSelect(
              getFloorPriceQuery("NOW() - INTERVAL '30 days'"),
              'floorPrevious30d',
            )
            .addSelect(
              (query) =>
                query
                  .from(SaleEntity, 'sale')
                  .select('COUNT(*)')
                  .where('"sale"."collectionAddress" = "collection"."address"')
                  .andWhere(
                    `"sale"."currency" IN ('${utils.strip0x(
                      ethers.constants.AddressZero,
                    )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
                  ),
              'saleCount',
            )
            .addSelect(getSaleCountQuery('1 hour'), 'saleCount1h')
            .addSelect(getSaleCountQuery('6 hours'), 'saleCount6h')
            .addSelect(getSaleCountQuery('1 day'), 'saleCount24h')
            .addSelect(getSaleCountQuery('7 days'), 'saleCount7d')
            .addSelect(getSaleCountQuery('30 days'), 'saleCount30d')
            .addSelect(
              (query) =>
                query
                  .from(BalanceEntity, 'balance')
                  .select('SUM("balance"."balance")')
                  .where(
                    '"balance"."collectionAddress" = "collection"."address"',
                  )
                  .andWhere('"balance"."balance" > 0'),
              'totalSupply',
            )
            .addSelect(
              (query) =>
                query
                  .from(BalanceEntity, 'balance')
                  .select('COUNT(DISTINCT "balance"."userAddress")')
                  .where(
                    '"balance"."collectionAddress" = "collection"."address"',
                  )
                  .andWhere('"balance"."balance" > 0'),
              'ownerCount',
            )
            .addSelect(
              (query) =>
                query
                  .from(Order, 'order')
                  .select('COUNT(DISTINCT "order"."tokenId")')
                  .where(`"order"."type" <> '${OrderType.BID}'`)
                  .andWhere(
                    '"order"."collectionAddress" = "collection"."address"',
                  )
                  .andWhere('"order"."active"'),
              'listedCount',
            ),
        'collection',
      )
      .select('*')
      .addSelect('"volume1h" - "volumePrevious1h"', 'volumeChange1h')
      .addSelect('"volume6h" - "volumePrevious6h"', 'volumeChange6h')
      .addSelect('"volume24h" - "volumePrevious24h"', 'volumeChange24h')
      .addSelect('"volume7d" - "volumePrevious7d"', 'volumeChange7d')
      .addSelect('"volume30d" - "volumePrevious30d"', 'volumeChange30d')
      .addSelect('"floorPrice" - "floorPrevious1h"', 'floorChange1h')
      .addSelect('"floorPrice" - "floorPrevious6h"', 'floorChange6h')
      .addSelect('"floorPrice" - "floorPrevious24h"', 'floorChange24h')
      .addSelect('"floorPrice" - "floorPrevious7d"', 'floorChange7d')
      .addSelect('"floorPrice" - "floorPrevious30d"', 'floorChange30d');
  },
  name: 'collection_rankings',
  materialized: true,
})
@Index(['address'], { unique: true })
@Index(['volume'])
@Index(['volume1h'])
@Index(['volume6h'])
@Index(['volume24h'])
@Index(['volume7d'])
@Index(['volume30d'])
@Index(['volumeChange1h'])
@Index(['volumeChange6h'])
@Index(['volumeChange24h'])
@Index(['volumeChange7d'])
@Index(['volumeChange30d'])
@Index(['floorPrice'])
@Index(['floorChange1h'])
@Index(['floorChange6h'])
@Index(['floorChange24h'])
@Index(['floorChange7d'])
@Index(['floorChange30d'])
export class CollectionRanking extends BaseEntity {
  @ViewColumn()
  address!: string;

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
  volumeChange1h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange6h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange24h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange7d!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange30d!: string;

  @Field(() => String)
  @ViewColumn()
  floorPrice!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange1h!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange6h!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange24h!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange7d!: string;

  @Field(() => String)
  @ViewColumn()
  floorChange30d!: string;

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
  saleCount!: string;

  @Field(() => String)
  @ViewColumn()
  totalSupply!: string;

  @Field(() => String)
  @ViewColumn()
  ownerCount!: string;

  @Field(() => String)
  @ViewColumn()
  listedCount!: string;
}
