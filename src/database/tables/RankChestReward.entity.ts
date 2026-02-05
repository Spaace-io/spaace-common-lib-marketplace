import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { RankChest } from './RankChest.entity';
import { RankChestXpOutcome } from '../enums';

@ObjectType()
@Entity({ name: 'rank_chest_rewards' })
@Index(['rankChestId'], { unique: true })
export class RankChestReward extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('uuid')
  rankChestId!: string;

  @OneToOne(() => RankChest, (c) => c.reward, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'rankChestId' })
  chest!: RankChest;

  @Field(() => RankChestXpOutcome)
  @Column('enum', {
    enum: RankChestXpOutcome,
    enumName: 'rank_chest_xp_outcome_enum',
  })
  xpOutcome!: RankChestXpOutcome;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  baseXp!: string;

  @Field(() => [String])
  @Column('jsonb')
  xpValues!: string[];

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  xpAmount!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, scale: 2 })
  multiplierValue!: number;

  @Field(() => Number)
  @Column('int')
  multiplierDurationHours!: number;

  @Field(() => Date)
  @Column({ type: 'timestamptz' })
  startAt!: Date;

  @Field(() => Date)
  @Column({ type: 'timestamptz' })
  endAt!: Date;

  @Field(() => Number, { nullable: true })
  @Column('int', { nullable: true })
  xpMultiplierId!: number | null;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  createdAt!: Date;
}
