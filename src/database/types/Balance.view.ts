import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { BalanceEntity } from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(BalanceEntity, 'balance')
      .select('"balance"."collectionAddress"', 'collectionAddress')
      .addSelect('"balance"."tokenId"', 'tokenId')
      .addSelect('"balance"."userAddress"', 'userAddress')
      .addSelect('"balance"."balance"', 'balance')
      .where('"balance"."balance" > 0');
  },
  name: 'balances_view',
})
export class Balance extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  @ViewColumn()
  tokenId!: string;

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
