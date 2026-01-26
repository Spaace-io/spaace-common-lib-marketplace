import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BadgeEntity } from './Badge.entity';
import { User } from './User.entity';

@ObjectType()
@Entity({ name: 'user_featured_badges' })
@Index('IDX_user_featured_badges_user_position', ['userAddress', 'position'])
@Index('IDX_user_featured_badges_user_badge', ['userAddress', 'badgeId'], {
  unique: true,
})
export class UserFeaturedBadgeEntity extends BaseEntity {
  @Field(() => String, {
    description: 'Unique identifier for the user featured badge record',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String, {
    description: 'User wallet address',
  })
  @Column('varchar', { length: 42, name: 'user_address' })
  userAddress!: string;

  @Field(() => Number, {
    description:
      'Display position on user profile (1 = first, 2 = second, etc.)',
  })
  @Column('int', { default: 0, name: 'position' })
  position!: number;

  @Field(() => String, {
    description: 'Badge ID to display at this position',
  })
  @Column('uuid', { name: 'badge_id' })
  badgeId!: string;

  @Field(() => Date, {
    description: 'When the featured badge was last updated',
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

  @ManyToOne(() => BadgeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'badge_id' })
  badge?: BadgeEntity;
}
