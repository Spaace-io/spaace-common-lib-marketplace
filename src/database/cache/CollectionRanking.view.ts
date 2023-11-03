import {
  BaseEntity,
  Brackets,
  DataSource,
  Index,
  JoinColumn,
  ManyToOne,
  SelectQueryBuilder,
  ViewColumn,
  ViewEntity,
} from 'typeorm';
import { utils } from '../..';
import {
  ActiveOrderCached,
  BalanceEntity,
  CollectionEntity,
  Order,
  OrderType,
  SaleEntity,
} from '..';

function getVolumeQuery(interval: string, previous = false) {
  return (query: SelectQueryBuilder<object>) => {
    let subQuery = query
      .subQuery()
      .from(SaleEntity, 'sale')
      .select('SUM("sale"."price")')
      .where('"sale"."collectionAddress" = "collection"."address"')
      .andWhere(
        `"sale"."currency" IN ('${utils
          .strip0x(utils.constants.ETH_TOKENS)
          .join("','")}')`,
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
        `"order"."currency" IN ('${utils
          .strip0x(utils.constants.ETH_TOKENS)
          .join("','")}')`,
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
          `"order"."currency" IN ('${utils
            .strip0x(utils.constants.ETH_TOKENS)
            .join("','")}')`,
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
        `"sale"."currency" IN ('${utils
          .strip0x(utils.constants.ETH_TOKENS)
          .join("','")}')`,
      )
      .andWhere(`"sale"."timestamp" > NOW() - INTERVAL '${interval}'`);
}

@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(
        (query) =>
          query
            .from(CollectionEntity, 'collection')
            .select('"collection"."address"', 'address')
            .addSelect(
              (query) =>
                query
                  .from(SaleEntity, 'sale')
                  .select('SUM("sale"."price")')
                  .where('"sale"."collectionAddress" = "collection"."address"')
                  .andWhere(
                    `"sale"."currency" IN ('${utils
                      .strip0x(utils.constants.ETH_TOKENS)
                      .join("','")}')`,
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
                    `"sale"."currency" IN ('${utils
                      .strip0x(utils.constants.ETH_TOKENS)
                      .join("','")}')`,
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
                  .from(ActiveOrderCached, 'order')
                  .select('COUNT(DISTINCT "order"."tokenId")') // TODO: ERC1155 support
                  .where(`"order"."type" != '${OrderType.BID}'`)
                  .andWhere(
                    '"order"."collectionAddress" = "collection"."address"',
                  ),
              'listedCount',
            ),
        'collection',
      )
      .select('"collection"."address"', 'address')
      .addSelect('"collection"."volume"', 'volume')
      .addSelect('"collection"."volume1h"', 'volume1h')
      .addSelect('"collection"."volume6h"', 'volume6h')
      .addSelect('"collection"."volume24h"', 'volume24h')
      .addSelect('"collection"."volume7d"', 'volume7d')
      .addSelect('"collection"."volume30d"', 'volume30d')
      .addSelect(
        '"collection"."volume1h" - "collection"."volumePrevious1h"',
        'volumeChange1h',
      )
      .addSelect(
        '"collection"."volume6h" - "collection"."volumePrevious6h"',
        'volumeChange6h',
      )
      .addSelect(
        '"collection"."volume24h" - "collection"."volumePrevious24h"',
        'volumeChange24h',
      )
      .addSelect(
        '"collection"."volume7d" - "collection"."volumePrevious7d"',
        'volumeChange7d',
      )
      .addSelect(
        '"collection"."volume30d" - "collection"."volumePrevious30d"',
        'volumeChange30d',
      )
      .addSelect('"collection"."floorPrice"', 'floorPrice')
      .addSelect(
        '"collection"."floorPrice" - "collection"."floorPrevious1h"',
        'floorChange1h',
      )
      .addSelect(
        '"collection"."floorPrice" - "collection"."floorPrevious6h"',
        'floorChange6h',
      )
      .addSelect(
        '"collection"."floorPrice" - "collection"."floorPrevious24h"',
        'floorChange24h',
      )
      .addSelect(
        '"collection"."floorPrice" - "collection"."floorPrevious7d"',
        'floorChange7d',
      )
      .addSelect(
        '"collection"."floorPrice" - "collection"."floorPrevious30d"',
        'floorChange30d',
      )
      .addSelect('"collection"."saleCount"', 'saleCount')
      .addSelect('"collection"."saleCount1h"', 'saleCount1h')
      .addSelect('"collection"."saleCount6h"', 'saleCount6h')
      .addSelect('"collection"."saleCount24h"', 'saleCount24h')
      .addSelect('"collection"."saleCount7d"', 'saleCount7d')
      .addSelect('"collection"."saleCount30d"', 'saleCount30d')
      .addSelect('"collection"."totalSupply"', 'totalSupply')
      .addSelect('"collection"."ownerCount"', 'ownerCount')
      .addSelect('"collection"."listedCount"', 'listedCount');
  },
  name: 'collection_rankings_cache',
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
export class CollectionRankingCached extends BaseEntity {
  @ViewColumn()
  @ManyToOne(() => CollectionEntity)
  @JoinColumn({ name: 'address', referencedColumnName: 'address' })
  address!: string;

  @ViewColumn()
  volume!: string;

  @ViewColumn()
  volume1h!: string;

  @ViewColumn()
  volume6h!: string;

  @ViewColumn()
  volume24h!: string;

  @ViewColumn()
  volume7d!: string;

  @ViewColumn()
  volume30d!: string;

  @ViewColumn()
  volumeChange1h!: string;

  @ViewColumn()
  volumeChange6h!: string;

  @ViewColumn()
  volumeChange24h!: string;

  @ViewColumn()
  volumeChange7d!: string;

  @ViewColumn()
  volumeChange30d!: string;

  @ViewColumn()
  floorPrice!: string;

  @ViewColumn()
  floorChange1h!: string;

  @ViewColumn()
  floorChange6h!: string;

  @ViewColumn()
  floorChange24h!: string;

  @ViewColumn()
  floorChange7d!: string;

  @ViewColumn()
  floorChange30d!: string;

  @ViewColumn()
  saleCount1h!: string;

  @ViewColumn()
  saleCount6h!: string;

  @ViewColumn()
  saleCount24h!: string;

  @ViewColumn()
  saleCount7d!: string;

  @ViewColumn()
  saleCount30d!: string;

  @ViewColumn()
  saleCount!: string;

  @ViewColumn()
  totalSupply!: string;

  @ViewColumn()
  ownerCount!: string;

  @ViewColumn()
  listedCount!: string;
}
