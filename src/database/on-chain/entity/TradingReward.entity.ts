import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'trading_rewards' })
export class TradingReward extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  user!: string;

  @Field()
  @PrimaryColumn('date', { default: () => 'CURRENT_DATE' })
  date!: Date;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true })
  buyAmount!: string;

  @Field()
  @Column('numeric', { precision: 78, unsigned: true })
  sellAmount!: string;
}
