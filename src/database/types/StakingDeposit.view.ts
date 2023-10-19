import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, DataSource, ViewColumn, ViewEntity } from 'typeorm';
import { ethers } from 'ethers';
import { Transform } from 'class-transformer';
import { StakingDepositEntity, StakingType } from '../tables';

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(StakingDepositEntity, 'deposit')
      .select('"deposit"."txHash"', 'txHash')
      .addSelect('"deposit"."logIdx"', 'logIdx')
      .addSelect('"deposit"."type"', 'type')
      .addSelect('"deposit"."pool"', 'pool')
      .addSelect('"deposit"."userAddress"', 'userAddress')
      .addSelect('"deposit"."depositId"', 'depositId')
      .addSelect('"deposit"."lockTypeId"', 'lockTypeId')
      .addSelect('"deposit"."vestingTypeId"', 'vestingTypeId')
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

  @Field(() => StakingType)
  @ViewColumn()
  type!: StakingType;

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
  userAddress!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  depositId!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  lockTypeId!: string | null;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  vestingTypeId!: string | null;

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

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(StakingDepositEntity, 'deposit')
      .where(`"deposit"."type" = '${StakingType.ACTIVE}'`)
      .select('"deposit"."txHash"', 'txHash')
      .addSelect('"deposit"."logIdx"', 'logIdx')
      .addSelect('"deposit"."type"', 'type')
      .addSelect('"deposit"."pool"', 'pool')
      .addSelect('"deposit"."userAddress"', 'userAddress')
      .addSelect('"deposit"."depositId"', 'depositId')
      .addSelect('"deposit"."lockTypeId"', 'lockTypeId')
      .addSelect('"deposit"."shares"', 'shares')
      .addSelect('"deposit"."tokens"', 'tokens')
      .addSelect('"deposit"."timestamp"', 'timestamp');
  },
  name: 'active_staking_deposits_view',
})
export class ActiveStakingDeposit extends BaseEntity {
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

  @Field(() => StakingType)
  @ViewColumn()
  type!: StakingType;

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
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  depositId!: string;

  @Field(() => String, { nullable: true })
  @ViewColumn()
  lockTypeId!: string | null;

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

@ObjectType()
@ViewEntity({
  expression: (dataSource: DataSource) => {
    return dataSource
      .createQueryBuilder()
      .from(StakingDepositEntity, 'deposit')
      .where(`"deposit"."type" = '${StakingType.PASSIVE}'`)
      .select('"deposit"."txHash"', 'txHash')
      .addSelect('"deposit"."logIdx"', 'logIdx')
      .addSelect('"deposit"."type"', 'type')
      .addSelect('"deposit"."pool"', 'pool')
      .addSelect('"deposit"."userAddress"', 'userAddress')
      .addSelect('"deposit"."vestingTypeId"', 'vestingTypeId')
      .addSelect('"deposit"."shares"', 'shares')
      .addSelect('"deposit"."tokens"', 'tokens')
      .addSelect('"deposit"."timestamp"', 'timestamp');
  },
  name: 'passive_staking_deposits_view',
})
export class PassiveStakingDeposit extends BaseEntity {
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

  @Field(() => StakingType)
  @ViewColumn()
  type!: StakingType;

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
  userAddress!: string;

  @Field(() => String)
  @ViewColumn()
  vestingTypeId!: string;

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
