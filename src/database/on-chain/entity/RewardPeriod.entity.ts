import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { DistributorContract } from '.';

@Entity({ name: 'reward_periods' })
export class RewardPeriodEntity extends BaseEntity {
  @PrimaryColumn('enum', {
    enum: DistributorContract,
    enumName: 'distributor_contract',
  })
  distributor!: DistributorContract;

  @PrimaryColumn('timestamp without time zone', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  startTime!: Date;

  @Column('timestamp without time zone')
  endTime!: Date;

  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  amount!: string;

  @Column('boolean', { default: false })
  distributed!: boolean;
}
