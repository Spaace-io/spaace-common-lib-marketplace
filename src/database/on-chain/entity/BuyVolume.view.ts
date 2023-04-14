import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Sale } from '.';

@ObjectType()
@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(Sale, 'sale')
      .select('"to"', 'user')
      .addSelect('"currency"')
      .addSelect('DATE_TRUNC(\'day\', "timestamp")::DATE', 'date')
      .addSelect('SUM("price")', 'volume')
      .groupBy('"to"')
      .addGroupBy('"currency"')
      .addGroupBy('"date"');
  },
  name: 'buy_volumes',
})
export class BuyVolume extends BaseEntity {
  @Field()
  @ViewColumn()
  user!: string;

  @Field()
  @ViewColumn()
  currency!: string;

  @Field()
  @ViewColumn()
  volume!: string;

  @Field()
  @ViewColumn()
  date!: Date;
}
