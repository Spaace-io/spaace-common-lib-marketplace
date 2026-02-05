import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEnum } from 'class-validator';

import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Quest, Season, TournamentsEntity, User } from '.';
import { ethers } from 'ethers';
import { Transform } from 'class-transformer';

export enum UserXpLogSource {
  QUEST = 'QUEST',
  REFERRAL = 'REFERRAL',
  ADMIN = 'ADMIN',
  TOURNAMENT = 'TOURNAMENT',
  RANK_CHEST = 'RANK_CHEST',
}

registerEnumType(UserXpLogSource, {
  name: 'UserXpLogSource',
});

@ObjectType()
export class UserXpLogMetadata {
  @Field(() => String)
  @Column('text')
  key!: string;

  @Field(() => String)
  @Column('text')
  value!: string;
}

@ObjectType()
@Entity({ name: 'user_xp_log' })
@Index(['userAddress', 'seasonNumber', 'questId'])
export class UserXpLog extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Field(() => String)
  @Column('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  @ManyToOne(() => Quest, { nullable: true })
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'questId', referencedColumnName: 'id' },
  ])
  questId?: string | null;

  @Field(() => String, { nullable: true })
  @Column('uuid', { nullable: true })
  @ManyToOne(() => TournamentsEntity, { nullable: true })
  @JoinColumn({ name: 'tournamentId', referencedColumnName: 'id' })
  tournamentId?: string | null;

  @Field(() => UserXpLogSource)
  @Column('enum', { enum: UserXpLogSource, enumName: 'user_xp_log_source' })
  @IsEnum(UserXpLogSource, {
    message:
      'source must be one of the following: QUEST, REFERRAL, ADMIN, TOURNAMENT, RANK_CHEST',
  })
  source!: UserXpLogSource;

  @Field(() => [UserXpLogMetadata])
  @Column('jsonb')
  metadata!: UserXpLogMetadata[];

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  xp!: string;
}
