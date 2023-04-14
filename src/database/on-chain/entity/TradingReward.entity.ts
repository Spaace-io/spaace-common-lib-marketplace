import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'trading_rewards' })
export class TradingReward extends BaseEntity {
  @Field()
  @Column('char', { length: 40 })
  user!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true })
  buyAmount!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true })
  sellAmount!: string;

  @Field()
  @Column({ default: () => 'CURRENT_DATE' })
  date!: Date;
}
