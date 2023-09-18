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
import { SaleEntity } from './Sale.entity';
import { utils } from '../../..';
import { ethers } from 'ethers';
import { CollectionEntity } from './Collection.entity';
import { OrderType } from './Order.entity';
import { Balance, Order } from '../types';

function getVolumeQuery(interval: string) {
  return (query: SelectQueryBuilder<object>) =>
    query.fromDummy().select(
      `COALESCE(${query
        .subQuery()
        .from(SaleEntity, 'sale')
        .select('SUM("sale"."price")')
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(
          `"sale"."currency" IN ('${utils.strip0x(
            ethers.constants.AddressZero,
          )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
        )
        .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`)
        .getQuery()}, 0)`,
    );
}

function getVolumeChangeQuery(interval: string) {
  return (query: SelectQueryBuilder<object>) =>
    query.fromDummy().select(
      `COALESCE(${query
        .subQuery()
        .from(SaleEntity, 'sale')
        .select(
          `${getVolumeQuery(interval)(
            query.subQuery(),
          ).getQuery()} - SUM("sale"."price")`,
        )
        .where('"sale"."collectionAddress" = "collection"."address"')
        .andWhere(
          `"sale"."currency" IN ('${utils.strip0x(
            ethers.constants.AddressZero,
          )}', '${utils.strip0x(utils.constants.WETH_ADDRESS)}')`,
        )
        .andWhere(`"sale"."timestamp" > NOW() - (INTERVAL '${interval}' * 2)`)
        .andWhere(`"sale"."timestamp" <= NOW() - INTERVAL '${interval}'`)
        .getQuery()}, 0)`,
    );
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
        .andWhere(
          (query) =>
            `${query
              .subQuery()
              .select('"balance"."balance"')
              .from(Balance, 'balance')
              .where('"balance"."userAddress" = "order"."userAddress"')
              .andWhere(
                '"balance"."collectionAddress" = "order"."collectionAddress"',
              )
              .andWhere('"balance"."tokenId" = "order"."tokenId"')
              .getQuery()} > 0`,
        );
    }

    return query;
  };
}

function getFloorChangeQuery(interval: string) {
  return (query: SelectQueryBuilder<object>) =>
    query
      .fromDummy()
      .select(
        `COALESCE(${getFloorPriceQuery()(
          query.subQuery(),
        ).getQuery()}, 0) - COALESCE(${getFloorPriceQuery(
          `(NOW() - INTERVAL '${interval}')`,
        )(query.subQuery()).getQuery()}, 0)`,
      );
}

@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(CollectionEntity, 'collection')
      .select('"collection"."address"')
      .addSelect(getVolumeQuery('1 hour'), 'volume1h')
      .addSelect(getVolumeChangeQuery('1 hour'), 'volumeChange1h')
      .addSelect(getVolumeQuery('6 hours'), 'volume6h')
      .addSelect(getVolumeChangeQuery('6 hours'), 'volumeChange6h')
      .addSelect(getVolumeQuery('1 day'), 'volume24h')
      .addSelect(getVolumeChangeQuery('1 day'), 'volumeChange24h')
      .addSelect(getVolumeQuery('7 days'), 'volume7d')
      .addSelect(getVolumeChangeQuery('7 days'), 'volumeChange7d')
      .addSelect(getVolumeChangeQuery('30 days'), 'volumeChange30d')
      .addSelect(getVolumeQuery('30 days'), 'volume30d')
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
      .addSelect(getFloorPriceQuery(), 'floorPrice')
      .addSelect(getFloorChangeQuery('1 hour'), 'floorChange1h')
      .addSelect(getFloorChangeQuery('6 hours'), 'floorChange6h')
      .addSelect(getFloorChangeQuery('1 day'), 'floorChange24h')
      .addSelect(getFloorChangeQuery('7 days'), 'floorChange7d')
      .addSelect(getFloorChangeQuery('30 days'), 'floorChange30d');
  },
  name: 'collection_rankings',
  materialized: true,
})
@Index(['volume1h'])
@Index(['volumeChange1h'])
@Index(['volume6h'])
@Index(['volumeChange6h'])
@Index(['volume24h'])
@Index(['volumeChange24h'])
@Index(['volume7d'])
@Index(['volumeChange7d'])
@Index(['volume30d'])
@Index(['volumeChange30d'])
@Index(['volume'])
@Index(['floorChange1h'])
@Index(['floorChange6h'])
@Index(['floorChange24h'])
@Index(['floorChange7d'])
@Index(['floorChange30d'])
@Index(['floorPrice'])
export class CollectionRanking extends BaseEntity {
  @ViewColumn()
  address!: string;

  @Field(() => String)
  @ViewColumn()
  volume1h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange1h!: string;

  @Field(() => String)
  @ViewColumn()
  volume6h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange6h!: string;

  @Field(() => String)
  @ViewColumn()
  volume24h!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange24h!: string;

  @Field(() => String)
  @ViewColumn()
  volume7d!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange7d!: string;

  @Field(() => String)
  @ViewColumn()
  volume30d!: string;

  @Field(() => String)
  @ViewColumn()
  volumeChange30d!: string;

  @Field(() => String)
  @ViewColumn()
  volume!: string;

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
  floorPrice!: string;
}
