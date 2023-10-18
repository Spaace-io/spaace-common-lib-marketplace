import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { ethers } from 'ethers';
import { Transform } from 'class-transformer';
import { StakingDepositEntity, StakingPool } from '../tables';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(StakingDepositEntity, 'deposit')
      .select('"deposit"."txHash"', 'txHash')
      .addSelect('"deposit"."logIdx"', 'logIdx')
      .addSelect('"deposit"."userAddress"', 'userAddress')
      .addSelect('"deposit"."pool"', 'pool')
      .addSelect('"deposit"."depositId"', 'depositId')
      .addSelect('"deposit"."lockTypeId"', 'lockTypeId')
      .addSelect('"deposit"."shares"', 'shares')
      .addSelect('"deposit"."tokens"', 'tokens')
      .addSelect('"deposit"."timestamp"', 'timestamp');
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

  @Field(() => StakingPool)
  @ViewColumn()
  pool!: StakingPool;

  @Field(() => String)
  @ViewColumn()
  depositId!: string;

  @Field(() => String)
  @ViewColumn()
  lockTypeId!: string;

  @Field(() => String)
  @ViewColumn()
  shares!: string;

  @Field(() => String)
  @ViewColumn()
  tokens!: string;

  @Field(() => Date)
  @ViewColumn()
  timestamp!: Date;
}
