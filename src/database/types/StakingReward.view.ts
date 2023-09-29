import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { ethers } from 'ethers';
import { StakingRewardEntity } from '../tables';
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
      .addSelect('"reward"."timestamp"', 'timestamp')
      .addSelect('"reward"."pool"', 'pool')
      .addSelect('"reward"."token"', 'token')
      .addSelect('"reward"."amount"', 'amount');
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
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  token!: string;

  @Field(() => String)
  @ViewColumn()
  amount!: string;
}
