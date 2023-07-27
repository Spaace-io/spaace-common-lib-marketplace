import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'staking_rewards' })
export class StakingReward extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 64 })
  @Transform(
    ({ value }) => ethers.utils.hexlify(value, { allowMissingPrefix: true }),
    {
      toPlainOnly: true,
    },
  )
  txHash!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  logIdx!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => Date)
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  pool!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  token!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78 }) // 78 digits = Maximum uint256 value
  amount!: string;
}
