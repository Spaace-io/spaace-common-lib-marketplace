import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'referral_rewards' })
export class ReferralReward extends BaseEntity {
  @Field()
  @Column('char', { length: 40 })
  user!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true })
  referrerAmount!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true })
  referredAmount!: string;

  @Field()
  @Column({ default: () => 'CURRENT_DATE' })
  date!: Date;
}
