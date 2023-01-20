import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transfer } from './Transfer.entity';

@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(
        (query) =>
          query
            .from(Transfer, 'transfer')
            .select('"collection"')
            .addSelect('"tokenId"')
            .addSelect('"to"', 'user')
            .addSelect('SUM("amount")', 'total')
            .groupBy('"collection"')
            .addGroupBy('"tokenId"')
            .addGroupBy('"to"'),
        'sent',
      )
      .leftJoin(
        (query) =>
          query
            .from(Transfer, 'transfer')
            .select('"collection"')
            .addSelect('"tokenId"')
            .addSelect('"from"', 'user')
            .addSelect('SUM("amount")', 'total')
            .groupBy('"collection"')
            .addGroupBy('"tokenId"')
            .addGroupBy('"from"'),
        'received',
        '"sent"."collection" = "received"."collection" AND "sent"."tokenId" = "received"."tokenId" AND "sent"."user" = "received"."user"',
      )
      .select('"received"."collection"')
      .addSelect('"received"."tokenId"')
      .addSelect('"received"."user"')
      .addSelect('"received"."total" - COALESCE("sent"."total", 0)', 'balance')
      .where('"received"."total" > COALESCE("sent"."total", 0)');
  },
  name: 'balances',
})
export class Balance extends BaseEntity {
  @ViewColumn()
  collection!: string;

  @ViewColumn()
  tokenId!: string;

  @ViewColumn()
  user!: string;

  @ViewColumn()
  balance!: string;
}
