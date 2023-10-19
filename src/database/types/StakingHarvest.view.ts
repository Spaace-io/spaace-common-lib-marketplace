import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { ethers } from 'ethers';
import { StakingHarvestEntity } from '../tables';
import { Transform } from 'class-transformer';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(StakingHarvestEntity, 'harvest')
      .select('"harvest"."txHash"', 'txHash')
      .addSelect('"harvest"."logIdx"', 'logIdx')
      .addSelect('"harvest"."userAddress"', 'userAddress')
      .addSelect('"harvest"."pool"', 'pool')
      .addSelect('"harvest"."depositId"', 'depositId')
      .addSelect('"harvest"."token"', 'token')
      .addSelect('"harvest"."amount"', 'amount')
      .addSelect('"harvest"."timestamp"', 'timestamp');
  },
  name: 'staking_harvests_view',
})
export class StakingHarvest extends BaseEntity {
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

  @Field(() => String)
  @ViewColumn()
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  pool!: string;

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
