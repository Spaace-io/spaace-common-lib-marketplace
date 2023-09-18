import { Field } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'staking_rewards' })
export class StakingRewardEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  logIdx!: string;

  @Column('char', { length: 40 })
  userAddress!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  @Column('char', { length: 40 })
  pool!: string;

  @Column('char', { length: 40 })
  token!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78 }) // 78 digits = Maximum uint256 value
  amount!: string;
}
