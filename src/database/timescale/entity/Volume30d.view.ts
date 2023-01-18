import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Sale } from '..';

@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(Sale, 'sale')
      .select('"collection"')
      .addSelect('"currency"')
      .addSelect('time_bucket(INTERVAL \'30 days\', "timestamp") AS "bucket"')
      .addSelect('SUM("price")', 'volume')
      .groupBy('"collection"')
      .addGroupBy('"currency"')
      .addGroupBy('"bucket"');
  },
})
export class Volume30d extends BaseEntity {
  @ViewColumn()
  collection!: string;

  @ViewColumn()
  currency!: string;

  @ViewColumn()
  bucket!: Date;

  @ViewColumn()
  volume!: string;
}
