import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BadgeEntity } from './Badge.entity';
import { User } from './User.entity';

export enum BadgeStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  CLAIMED = 'CLAIMED',
}

@ObjectType()
@Entity({ name: 'user_badges' })
@Index('IDX_user_badges_user_status', ['userAddress', 'status'])
@Index('IDX_user_badges_unlocked_at', ['unlockedAt'])
@Index('IDX_user_badges_next_eval', ['nextEvaluationAt'])
@Index('UQ_user_badges_user_badge', ['userAddress', 'badgeId'], {
  unique: true,
})
export class UserBadgeEntity extends BaseEntity {
  @Field(() => String, {
    description: 'Unique identifier for the user badge record',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String, {
    description: 'User wallet address',
  })
  @Column('varchar', { length: 42, name: 'user_address' })
  userAddress!: string;

  @Field(() => String, {
    description: 'Badge ID',
  })
  @Column('uuid', { name: 'badge_id' })
  badgeId!: string;

  @Field(() => String, {
    description:
      'Badge status: LOCKED (not eligible), UNLOCKED (can claim), CLAIMED (claimed)',
  })
  @Column('enum', {
    enum: BadgeStatus,
    enumName: 'badge_status',
    default: BadgeStatus.LOCKED,
  })
  status!: BadgeStatus;

  @Field(() => Number, {
    description:
      'Number of times this badge has been earned (for repeatable badges)',
  })
  @Column('int', { default: 0 })
  count!: number;

  @Field(() => Date, {
    nullable: true,
    description: 'When the badge was unlocked',
  })
  @Column('timestamp with time zone', { nullable: true, name: 'unlocked_at' })
  unlockedAt!: Date | null;

  @Field(() => Date, {
    nullable: true,
    description: 'When the user claimed the badge and saw the animation',
  })
  @Column('timestamp with time zone', { nullable: true, name: 'claimed_at' })
  claimedAt!: Date | null;

  @Field(() => Date, {
    nullable: true,
    description: 'When eligibility was last checked',
  })
  @Column('timestamp with time zone', {
    nullable: true,
    name: 'last_evaluated_at',
  })
  lastEvaluatedAt!: Date | null;

  @Field(() => Date, {
    nullable: true,
    description: 'When to check eligibility next (for optimization)',
  })
  @Column('timestamp with time zone', {
    nullable: true,
    name: 'next_evaluation_at',
  })
  nextEvaluationAt!: Date | null;

  @Field(() => Date, {
    description: 'When the user badge record was created',
  })
  @Column('timestamp with time zone', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @Field(() => Date, {
    description: 'When the user badge record was last updated',
  })
  @Column('timestamp with time zone', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_address', referencedColumnName: 'address' })
  user?: User;

  @ManyToOne(() => BadgeEntity, (badge) => badge.userBadges, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'badge_id' })
  badge?: BadgeEntity;
}
