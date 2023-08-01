import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { DistributorContract } from '.';

@ObjectType()
@Entity({ name: 'reward_periods' })
export class RewardPeriod extends BaseEntity {
  @Field(() => DistributorContract)
  @PrimaryColumn('enum', {
    enum: DistributorContract,
    enumName: 'distributor_contract',
  })
  distributor!: DistributorContract;

  @Field(() => Date)
  @PrimaryColumn('timestamp without time zone', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  startTime!: Date;

  @Field(() => Date)
  @Column('timestamp without time zone')
  endTime!: Date;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  amount!: string;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  distributed!: boolean;
}
