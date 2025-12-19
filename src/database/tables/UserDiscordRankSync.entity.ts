import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryColumn,
  Index,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';
import { DiscordTierEnum } from '../enums/DiscordTierEnum.enum';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'user_discord_rank_sync' })
@Index(['discordId'])
@Index(['seasonNumber', 'updatedAt'])
export class UserDiscordRankSync extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @PrimaryColumn('text')
  seasonNumber!: string;

  @Field(() => String)
  @Column({ type: 'text' })
  discordId!: string;

  @Field(() => DiscordTierEnum, { nullable: true })
  @Column({
    type: 'enum',
    enumName: 'discord_tier',
    enum: DiscordTierEnum,
    nullable: true,
  })
  lastSyncedTier!: DiscordTierEnum | null;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  lastSyncedAt!: Date | null;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
