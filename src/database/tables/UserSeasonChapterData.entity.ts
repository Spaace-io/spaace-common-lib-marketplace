import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import { User } from './User.entity';
import { Season } from './Season.entity';
import { SeasonChapter } from './SeasonChapter.entity';
import { LoyaltyRank } from './SeasonRank.entity';
import { DiscordTierEnum } from '../enums/DiscordTierEnum.enum';

@ObjectType()
@Entity({ name: 'user_season_chapters_data' })
@Index(['seasonNumber', 'chapterId'])
@Index(['seasonNumber', 'points'])
export class UserSeasonChapterData extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => Number)
  @PrimaryColumn('integer')
  @ManyToOne(() => SeasonChapter)
  @JoinColumn({ name: 'chapterId', referencedColumnName: 'id' })
  chapterId!: number;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  snapshotAt!: Date;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  points!: string;

  @Field(() => LoyaltyRank)
  @Column('enum', { enum: LoyaltyRank, enumName: 'rank' })
  rank!: LoyaltyRank;

  @Field(() => String)
  @Column('bigint', { default: '0' })
  questCompleted!: string;

  @Field(() => DiscordTierEnum, { nullable: true })
  @Column({
    type: 'enum',
    enum: DiscordTierEnum,
    enumName: 'discord_tier',
    nullable: true,
    default: null,
  })
  discordTierFloor!: DiscordTierEnum | null;
}
