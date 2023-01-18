import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Volume24h } from '..';

@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(Volume24h, 'volume24h')
      .select('"collection"')
      .addSelect('"currency"')
      .addSelect(
        'time_bucket(INTERVAL \'7 days\', "volume24h"."bucket") AS "bucket"',
      )
      .addSelect('SUM("volume")', 'volume')
      .groupBy('"collection"')
      .addGroupBy('"currency"')
      .addGroupBy('"bucket"');
  },
})
export class Volume7d extends BaseEntity {
  @ViewColumn()
  collection!: string;

  @ViewColumn()
  currency!: string;

  @ViewColumn()
  bucket!: Date;

  @ViewColumn()
  volume!: string;
}
