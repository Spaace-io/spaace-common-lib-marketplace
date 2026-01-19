import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User.entity';

@ObjectType()
@Entity({ name: 'ambassador_epoch_leaderboard' })
@Index(['epochId', 'rank'])
export class AmbassadorEpochLeaderboard extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('uuid')
  epochId!: string;

  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  userAddress!: string;

  @Field(() => Number)
  @Column('int')
  scoreBp!: number;

  /**
   * Rank is always computed by backend deterministically.
   * In manual mode: admin sets scoreBp; backend recomputes rank.
   */
  @Field(() => Number)
  @Column('int', { default: 0 })
  rank!: number;

  @Column({ type: 'timestamp without time zone', default: () => 'NOW()' })
  computedAt!: Date;

  @Column('int', { default: 0 })
  referralsCount!: number;

  @Column('numeric', { precision: 78, default: '0' })
  tradingVolume!: string;

  @Column('numeric', { precision: 78, default: '0' })
  referralTradingVolume!: string;

  @Column('numeric', { precision: 78, default: '0' })
  xpSum!: string;
}
