import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'staking_rewards' })
export class StakingRewardEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  logIdx!: string;

  @Column('char', { length: 40 })
  pool!: string;

  @Column('numeric', { precision: 78, nullable: true })
  vestingTypeId!: string | null;

  @Column('char', { length: 40 })
  token!: string;

  @Column('numeric', { precision: 78, unsigned: true })
  amount!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
