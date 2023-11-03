import { registerEnumType } from '@nestjs/graphql';
import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  Index,
  PrimaryColumn,
  TableInheritance,
} from 'typeorm';

export enum StakingType {
  PASSIVE = 'PASSIVE',
  ACTIVE = 'ACTIVE',
}

registerEnumType(StakingType, {
  name: 'StakingType',
});

@Entity({ name: 'staking_deposits' })
@TableInheritance({ column: { name: 'type' } })
@Index(['pool', 'userAddress', 'timestamp'])
@Index(['userAddress', 'timestamp'])
export class StakingDepositEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 64 })
  txHash!: string;

  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  logIdx!: string;

  @Column('enum', { enum: StakingType, enumName: 'staking_type' })
  type!: StakingType;

  @Column('char', { length: 40 })
  pool!: string;

  @Column('char', { length: 40 })
  userAddress!: string;

  @Column('numeric', { precision: 78 }) // Negative for withdrawals
  shares!: string;

  @Column('numeric', { precision: 78 }) // Negative for withdrawals
  tokens!: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}

@ChildEntity(StakingType.ACTIVE)
export class ActiveStakingDepositEntity extends StakingDepositEntity {
  @Column('numeric', { precision: 78, unsigned: true })
  depositId!: string;

  @Column('numeric', { precision: 78, unsigned: true, nullable: true }) // Null for withdrawals
  lockTypeId!: string | null;
}

@ChildEntity(StakingType.PASSIVE)
export class PassiveStakingDepositEntity extends StakingDepositEntity {
  @Column('numeric', { precision: 78, unsigned: true })
  vestingTypeId!: string;
}
