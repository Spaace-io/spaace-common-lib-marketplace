import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Index,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Season } from './Season.entity';
import { LoyaltyRank } from './SeasonRank.entity';
import { User } from './User.entity';
import { RankChestState } from '../enums/RankChestState.enum';
import { RankChestReward } from './RankChestReward.entity';

@ObjectType()
@Entity({ name: 'rank_chests' })
@Index(['userAddress', 'seasonNumber', 'state', 'createdAt'])
@Index(['userAddress', 'seasonNumber', 'rank'], { unique: true })
export class RankChest extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  userAddress!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  user!: User;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  seasonNumber!: string;

  @ManyToOne(() => Season, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  season!: Season;

  @Field(() => LoyaltyRank)
  @Column('enum', { enum: LoyaltyRank, enumName: 'rank' })
  rank!: LoyaltyRank;

  @Field(() => RankChestState)
  @Column('enum', {
    enum: RankChestState,
    enumName: 'rank_chest_state_enum',
    default: RankChestState.CLAIMABLE,
  })
  state!: RankChestState;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt!: Date;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true, default: null })
  claimedAt!: Date | null;

  @Column('text', { nullable: true })
  createdFrom!: string | null;

  @Field(() => RankChestReward, { nullable: true })
  @OneToOne(() => RankChestReward, (r) => r.chest, { nullable: true })
  reward!: RankChestReward | null;
}
