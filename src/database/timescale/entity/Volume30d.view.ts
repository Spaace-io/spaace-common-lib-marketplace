import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Sale } from '..';

@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(Sale, 'sale')
      .select('"collection"')
      .addSelect('"currency"')
      .addSelect(
        'FLOOR(EXTRACT(EPOCH FROM NOW() - "timestamp") / (30 * 24 * 60 * 60))',
        'bucket',
      )
      .addSelect('SUM("price")', 'volume')
      .where('"timestamp" > NOW() - INTERVAL \'60 days\'')
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
  bucket!: number;

  @ViewColumn()
  volume!: string;
}
