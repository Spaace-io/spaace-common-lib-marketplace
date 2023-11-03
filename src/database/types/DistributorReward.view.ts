import { Field, ObjectType } from '@nestjs/graphql';
import { ethers } from 'ethers';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { Transform } from 'class-transformer';
import { DistributorContract, DistributorRewardEntity } from '..';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(DistributorRewardEntity, 'reward')
      .select('"reward"."userAddress"', 'userAddress')
      .addSelect('"reward"."distributor"', 'distributor')
      .addSelect('"reward"."amount"', 'amount')
      .addSelect('"reward"."signature"', 'signature')
      .addSelect('"reward"."timestamp"', 'timestamp')
      .addSelect('"reward"."harvestTxHash"', 'harvestTxHash')
      .addSelect('"reward"."harvestLogIdx"', 'harvestLogIdx')
      .addSelect('"reward"."harvestTimestamp"', 'harvestTimestamp');
  },
  name: 'distributor_rewards_view',
})
export class DistributorReward extends BaseEntity {
  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => DistributorContract)
  @ViewColumn()
  distributor!: DistributorContract;

  @Field(() => String)
  @ViewColumn()
  amount!: string;

  @Field(() => String)
  @ViewColumn()
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  signature!: string;

  @Field(() => Date)
  @ViewColumn()
  timestamp!: Date;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  @Transform(
    ({ value }) =>
      value !== null
        ? ethers.utils.hexlify(value, { allowMissingPrefix: true })
        : null,
    {
      toPlainOnly: true,
    },
  )
  harvestTxHash!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  harvestLogIdx!: string | null;

  @Field(() => Date, { nullable: true })
  @ViewColumn()
  harvestTimestamp!: Date | null;
}
