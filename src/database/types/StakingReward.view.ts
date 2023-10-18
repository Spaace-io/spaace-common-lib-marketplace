import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { ethers } from 'ethers';
import { StakingPool, StakingRewardEntity } from '../tables';
import { Transform } from 'class-transformer';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(StakingRewardEntity, 'reward')
      .select('"reward"."txHash"', 'txHash')
      .addSelect('"reward"."logIdx"', 'logIdx')
      .addSelect('"reward"."userAddress"', 'userAddress')
      .addSelect('"reward"."pool"', 'pool')
      .addSelect('"reward"."depositId"', 'depositId')
      .addSelect('"reward"."token"', 'token')
      .addSelect('"reward"."amount"', 'amount')
      .addSelect('"reward"."timestamp"', 'timestamp');
  },
  name: 'staking_rewards_view',
})
export class StakingReward extends BaseEntity {
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
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  token!: string;

  @Field(() => String)
  @ViewColumn()
  amount!: string;

  @Field(() => Date)
  @ViewColumn()
  timestamp!: Date;
}
