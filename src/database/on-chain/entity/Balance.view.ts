import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Item, Transfer } from '.';

@ObjectType()
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
  @Field()
  @ViewColumn()
  collection!: string;

  @Field()
  @ViewColumn()
  tokenId!: string;

  @Field()
  @ViewColumn()
  user!: string;

  @Field()
  @ViewColumn()
  balance!: string;

  // GraphQL only fields

  @Field(() => Item)
  item?: Item;
}
