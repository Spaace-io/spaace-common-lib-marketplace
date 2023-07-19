import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Sale } from '.';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';

@ObjectType()
@ViewEntity({
  materialized: true,
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(Sale, 'sale')
      .select('"to"', 'userAddress')
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
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field(() => String)
  @ViewColumn()
  volume!: string;

  @Field(() => Date)
  @ViewColumn()
  date!: Date;
}
