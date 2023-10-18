import { registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export enum StakingPool {
  STANDARD_STAKING = 'STANDARD_STAKING',
  COMPOUND_STAKING = 'COMPOUND_STAKING',
}

registerEnumType(StakingPool, {
  name: 'StakingPool',
});

@Entity({ name: 'staking_deposits' })
export class StakingDepositEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  logIdx!: string;

  @Column('char', { length: 40 })
  userAddress!: string;

  @Column('enum', { enum: StakingPool, enumName: 'staking_pool' })
  pool!: StakingPool;

  @Column('numeric', { precision: 78, unsigned: true })
  depositId!: string;

  @Column('numeric', { precision: 78, unsigned: true, nullable: true }) // Null for withdrawals
  lockTypeId!: string | null;

  @Column('numeric', { precision: 78 }) // Negative for withdrawals
  shares!: string;

  @Column('numeric', { precision: 78 }) // Negative for withdrawals
  tokens!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
