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
      .addSelect('time_bucket(INTERVAL \'1 day\', "timestamp") AS "bucket"')
      .addSelect('SUM("amount")', 'amount')
      .groupBy('"collection"')
      .addGroupBy('"currency"')
      .addGroupBy('"bucket"');
  },
})
export class Volume24h extends BaseEntity {
  @ViewColumn()
  collection!: string;

  @ViewColumn()
  currency!: string;

  @ViewColumn()
  bucket!: Date;

  @ViewColumn()
  amount!: string;
}
