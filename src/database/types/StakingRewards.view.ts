import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { StakingRewardEntity } from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(StakingRewardEntity, 'reward')
      .select('"reward"."txHash"', 'txHash')
      .addSelect('"reward"."logIdx"', 'logIdx')
      .addSelect('"reward"."pool"', 'pool')
      .addSelect('"reward"."vestingTypeId"', 'vestingTypeId')
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
  pool!: string;

  @Field(() => String)
  @ViewColumn()
  vestingTypeId!: string;

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
