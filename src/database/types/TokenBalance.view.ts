import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, Index, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { TokenBalanceEntity } from '../tables';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(TokenBalanceEntity, 'balance')
      .select('"balance"."currency"', 'currency')
      .addSelect('"balance"."userAddress"', 'userAddress')
      .addSelect('"balance"."balance"', 'balance')
      .where('"balance"."balance" > 0');
  },
  name: 'token_balances_view',
})
@Index(['userAddress', 'currency'])
export class TokenBalance extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  currency!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  balance!: string;
}
