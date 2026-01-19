import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TournamentStatus } from '../enums/TournamentStatus.enum';
import { TournamentRewardType } from '../enums/TournamentRewardType.enum';
import { UserXpLog } from './UserXpLog.entity';
import { User } from './User.entity';

@ObjectType()
export class BonusTierType {
  @Field(() => Number, {
    description: 'Threshold in USD to unlock this bonus tier',
  })
  thresholdUsd!: number;

  @Field(() => Number, {
    description: 'Bonus multiplier for this tier (e.g., 1.2 = +20%)',
  })
  multiplier!: number;
}

@ObjectType()
@Entity({ name: 'tournaments' })
export class TournamentsEntity extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String, { description: 'Tournament name, unique' })
  @Index({ unique: true })
  @Column('text', { comment: 'Unique tournament name' })
  name!: string;

  @Field(() => String)
  @Column('text')
  description!: string;

  @Field(() => TournamentStatus)
  @Column({
    type: 'enum',
    enum: TournamentStatus,
    default: TournamentStatus.SCHEDULED,
    name: 'status',
  })
  status!: TournamentStatus;

  @Field(() => Date)
  @Column('timestamp with time zone', { name: 'start_at' })
  startAt!: Date;

  @Field(() => Date)
  @Column('timestamp with time zone', { name: 'end_at' })
  endAt!: Date;

  @Field(() => String)
  @Column('bigint', {
    name: 'total_prize_amount',
    comment: 'Total prize amount (XP or USD depending on reward_type)',
    default: '0',
  })
  totalPrizeAmount!: string;

  @Field(() => TournamentRewardType)
  @Column({
    type: 'varchar',
    length: 10,
    name: 'reward_type',
    default: TournamentRewardType.XP,
    comment: 'Reward type: XP or USD (Spaace tokens)',
  })
  rewardType!: TournamentRewardType;

  @Field(() => String, { nullable: true })
  @Column('numeric', {
    precision: 78,
    name: 'rewarded_participants_volume_wei',
    nullable: true,
    comment:
      'Cumulative trading volume in Wei of all rewarded participants (used for community bonus calculation)',
  })
  @Transform(
    ({ value }) => {
      return value ? ethers.utils.formatEther(value) : null;
    },
    { toPlainOnly: true },
  )
  rewardedParticipantsVolumeWei?: string | null;

  @Field(() => [BonusTierType], {
    description:
      'Community bonus tiers configuration: volume thresholds and multipliers',
  })
  @Column('jsonb', {
    name: 'bonus_tiers',
    default: () => "'[]'::jsonb",
    nullable: false,
    comment:
      'Community bonus tiers config: [{ thresholdUsd: 1000000, multiplier: 1.2 }, { thresholdUsd: 2000000, multiplier: 1.5 }]',
  })
  bonusTiers!: BonusTierType[];

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date;

  @OneToMany(
    () => TournamentRewardBracket,
    (tournamentRewardBracket) => tournamentRewardBracket.tournament,
  )
  rewardBrackets!: TournamentRewardBracket[];

  @OneToMany(
    () => TournamentResult,
    (tournamentResult) => tournamentResult.tournament,
  )
  results!: TournamentResult[];

  @OneToMany(
    () => TournamentParticipant,
    (tournamentParticipant) => tournamentParticipant.tournament,
  )
  participants!: TournamentParticipant[];

  @OneToMany(() => UserXpLog, (userXpLog) => userXpLog.tournamentId, {
    nullable: true,
  })
  userXpLogs!: UserXpLog[];
}

@ObjectType()
@Entity({ name: 'tournament_reward_brackets' })
@Index(['tournamentId', 'placeFrom'])
@Index(['tournamentId', 'placeTo'])
export class TournamentRewardBracket extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('uuid', { name: 'tournament_id' })
  tournamentId!: string;

  @Field(() => Number)
  @Column('integer', { name: 'place_from' })
  placeFrom!: number;

  @Field(() => Number)
  @Column('integer', { name: 'place_to' })
  placeTo!: number;

  @Field(() => String, { nullable: true })
  @Column('bigint', {
    name: 'reward_amount',
    nullable: true,
    comment:
      'Reward amount (XP or USD depending on tournament reward_type). Can be null for USD tournaments with dynamic distribution',
  })
  rewardAmount?: string | null;

  @Field(() => String)
  @Column('numeric', {
    precision: 78,
    name: 'score',
    comment: 'Final score/metric (e.g., volume) (stored as string)',
  })
  @Transform(
    ({ value }) => {
      return ethers.utils.formatEther(value || '0');
    },
    { toPlainOnly: true },
  )
  score!: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => TournamentsEntity)
  @JoinColumn({ name: 'tournament_id', referencedColumnName: 'id' })
  tournament!: TournamentsEntity;
}

@ObjectType()
@Entity({ name: 'tournament_results' })
@Index(['tournamentId', 'address'])
@Index(['tournamentId', 'finalPlace'])
export class TournamentResult extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('uuid', { name: 'tournament_id' })
  tournamentId!: string;

  @ManyToOne(() => TournamentsEntity)
  @JoinColumn({ name: 'tournament_id', referencedColumnName: 'id' })
  tournament!: TournamentsEntity;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'address', referencedColumnName: 'address' })
  user!: User;

  @Field(() => Number)
  @Column('integer', { name: 'final_place' })
  finalPlace!: number;

  @Field(() => String)
  @Column('bigint', {
    name: 'reward_amount',
    comment: 'Final reward amount after bonus (XP or USD)',
  })
  rewardAmount!: string;

  @Field(() => String, { nullable: true })
  @Column('numeric', {
    name: 'base_reward_amount',
    nullable: true,
    comment: 'Base reward amount before bonus multiplier',
  })
  baseRewardAmount?: string | null;

  @Field(() => String)
  @Column('numeric', {
    precision: 78,
    name: 'score',
    comment: 'Final score/metric (e.g., volume) (stored as string)',
  })
  @Transform(
    ({ value }) => {
      return ethers.utils.formatEther(value || '0');
    },
    { toPlainOnly: true },
  )
  score!: string;

  @Field(() => Number)
  @Column('integer', { name: 'count_purchases' })
  countPurchases!: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date;
}

@ObjectType()
@Entity({ name: 'tournament_participants' })
@Index(['tournamentId', 'address'])
@Index(['tournamentId', 'place'])
export class TournamentParticipant extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('uuid', { name: 'tournament_id' })
  tournamentId!: string;

  @ManyToOne(() => TournamentsEntity)
  @JoinColumn({ name: 'tournament_id', referencedColumnName: 'id' })
  tournament!: TournamentsEntity;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'address', referencedColumnName: 'address' })
  user!: User;

  @Field(() => String)
  @Column('numeric', {
    precision: 78,
    name: 'score',
    comment:
      'Current player progress (e.g., trading volume in Wei) (stored as string)',
    default: '0',
  })
  @Transform(
    ({ value }) => {
      return ethers.utils.formatEther(value || '0');
    },
    { toPlainOnly: true },
  )
  score!: string;

  @Field(() => Number)
  @Column('integer', {
    name: 'place',
    comment: 'Computed field, updated periodically or on request',
  })
  place!: number;

  @Field(() => Number)
  @Column('integer', {
    name: 'count_purchases',
    comment: 'Count of purchases',
  })
  countPurchases!: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt!: Date;
}
