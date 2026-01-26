import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BadgeEntity } from './Badge.entity';
import { User } from './User.entity';

@ObjectType()
@Entity({ name: 'badge_unlock_history' })
@Index('IDX_badge_unlock_history_user', ['userAddress', 'createdAt'])
@Index('IDX_badge_unlock_history_badge', ['badgeId', 'createdAt'])
export class BadgeUnlockHistoryEntity extends BaseEntity {
  @Field(() => String, {
    description: 'Unique identifier for the history record',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String, {
    description: 'User wallet address who unlocked the badge',
  })
  @Column('varchar', { length: 42, name: 'user_address' })
  userAddress!: string;

  @Field(() => String, {
    description: 'Badge ID that was unlocked',
  })
  @Column('uuid', { name: 'badge_id' })
  badgeId!: string;

  @Field(() => Date, {
    description: 'When the badge was unlocked',
  })
  @Column('timestamp with time zone', { name: 'unlocked_at' })
  unlockedAt!: Date;

  @Field(() => Date, {
    description: 'When the record was created',
  })
  @Column('timestamp with time zone', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  // Relations
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_address', referencedColumnName: 'address' })
  user?: User;

  @ManyToOne(() => BadgeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'badge_id' })
  badge?: BadgeEntity;
}
