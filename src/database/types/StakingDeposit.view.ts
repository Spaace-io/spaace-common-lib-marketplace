import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { ethers } from 'ethers';
import { Transform } from 'class-transformer';
import { StakingDepositEntity } from '../tables';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(StakingDepositEntity, 'deposit')
      .select('"deposit"."txHash"', 'txHash')
      .addSelect('"deposit"."logIdx"', 'logIdx')
      .addSelect('"deposit"."userAddress"', 'userAddress')
      .addSelect('"deposit"."timestamp"', 'timestamp')
      .addSelect('"deposit"."pool"', 'pool')
      .addSelect('"deposit"."amount"', 'amount');
  },
  name: 'staking_deposits_view',
})
export class StakingDeposit extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  txHash!: string;

  @Field(() => String)
  @ViewColumn()
  logIdx!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => Date)
  @ViewColumn()
  timestamp!: Date;

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  pool!: string;

  @Field(() => String)
  @ViewColumn()
  amount!: string;
}
