import { Field } from '@nestjs/graphql';
import {
  BaseEntity,
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
      );
  },
  name: 'collection_volumes',
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
export class CollectionVolume extends BaseEntity {
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
}
