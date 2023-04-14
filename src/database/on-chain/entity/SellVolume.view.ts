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
      .select('"from"', 'user')
      .addSelect('"currency"')
      .addSelect('DATE_TRUNC(\'day\', "timestamp")::DATE', 'date')
      .addSelect('SUM("price")', 'volume')
      .groupBy('"from"')
      .addGroupBy('"currency"')
      .addGroupBy('"date"');
  },
  name: 'sell_volumes',
})
export class SellVolume extends BaseEntity {
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
