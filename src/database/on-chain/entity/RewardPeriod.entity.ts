import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

export enum RewardPeriodType {
  TRADING_REWARDS = 'Trading',
  REFERRAL_REWARDS = 'Referral',
}

registerEnumType(RewardPeriodType, {
  name: 'RewardPeriodType',
});

@ObjectType()
@Entity({ name: 'reward_periods' })
export class RewardPeriod extends BaseEntity {
  @Field(() => RewardPeriodType)
  @PrimaryColumn('enum', {
    enum: RewardPeriodType,
    enumName: 'reward_period_type',
  })
  distributor!: RewardPeriodType;

  @Field(() => Date)
  @PrimaryColumn('timestamp without time zone', {
    default: () => 'CURRENT_TIMESTAMP',
  })
  startTime!: Date;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  endTime!: Date | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  amount!: string;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  distributed!: boolean;
}
