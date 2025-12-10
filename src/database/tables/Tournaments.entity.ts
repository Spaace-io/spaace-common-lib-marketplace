import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TournamentStatus } from '../enums/TournamentStatus.enum';

@ObjectType()
@Entity({ name: 'tournaments' })
export class TournamentsEntity extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  name!: string;

  @Field(() => String)
  @Column('text')
  description!: string;

  @Field(() => TournamentStatus)
  @Column({
    type: 'enum',
    enum: TournamentStatus,
    default: TournamentStatus.DRAFT,
    name: 'status',
  })
  status!: TournamentStatus;

  @Field(() => Date)
  @Column('timestamp without time zone', { name: 'start_at' })
  startAt!: Date;

  @Field(() => Date)
  @Column('timestamp without time zone', { name: 'end_at' })
  endAt!: Date;

  @Field(() => String)
  @Column('bigint', {
    name: 'total_prize_xp',
    comment: 'Total prize XP (stored as string)',
    default: '0',
  })
  totalPrizeXp!: string;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
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
}

@ObjectType()
@Entity({ name: 'tournament_reward_brackets' })
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

  @Field(() => String)
  @Column('bigint', { name: 'reward_xp' })
  rewardXp!: string;

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
  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt!: Date;

  @ManyToOne(() => TournamentsEntity)
  @JoinColumn({ name: 'tournament_id', referencedColumnName: 'id' })
  tournament!: TournamentsEntity;
}

@ObjectType()
@Entity({ name: 'tournament_results' })
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
  @Column('char')
  address!: string;

  @Field(() => Number)
  @Column('integer', { name: 'final_place' })
  finalPlace!: number;

  @Field(() => String)
  @Column('bigint', {
    name: 'reward_xp',
    comment: 'XP reward received (stored as string)',
  })
  rewardXp!: string;

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
  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt!: Date;
}

@ObjectType()
@Entity({ name: 'tournament_participants' })
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
  @Column('char')
  address!: string;

  @Field(() => String)
  @Column('bigint', {
    name: 'score',
    comment:
      'Current player progress (e.g., trading volume in Wei) (stored as string)',
    default: '0',
  })
  @Transform(
    ({ value }) => {
      // Конвертируем wei в ETH при чтении из БД
      return ethers.utils.formatEther(value || '0');
    },
    { toPlainOnly: true },
  )
  score!: string; // В БД хранится в wei, при чтении возвращается в ETH

  @Field(() => Number)
  @Column('integer', {
    name: 'place',
    comment: 'Computed field, updated periodically or on request',
    nullable: true,
  })
  place!: number | null;

  @Field(() => Number)
  @Column('integer', {
    name: 'count_purchases',
    comment: 'Count of purchases',
  })
  countPurchases!: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp without time zone', name: 'updated_at' })
  updatedAt!: Date;
}
