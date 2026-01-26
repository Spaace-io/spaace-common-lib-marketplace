import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  Index,
  OneToMany,
} from 'typeorm';
import { BadgeConditionEntity } from './BadgeCondition.entity';
import { UserBadgeEntity } from './UserBadge.entity';

export enum BadgeCategory {
  COLLECTOR = 'collector',
  TRADING = 'trading',
  ACTIVITY = 'activity',
  SOCIAL = 'social',
  LOYALTY = 'loyalty',
}

export enum BadgeRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

@ObjectType()
@Entity({ name: 'badges' })
@Index('IDX_badges_code', ['code'])
@Index('IDX_badges_active_category', ['isActive', 'category'])
export class BadgeEntity extends BaseEntity {
  @Field(() => String, {
    description: 'Unique identifier for the badge',
  })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String, {
    description: 'Unique badge code (e.g., "OG", "COLLECTOR")',
  })
  @Column('varchar', { length: 100, unique: true })
  code!: string;

  @Field(() => String, {
    description:
      'Badge category: collector, trading, activity, social, loyalty',
  })
  @Column('enum', { enum: BadgeCategory, enumName: 'badge_category' })
  category!: BadgeCategory;

  @Field(() => String, {
    description:
      'Display name of the badge (visible only when unlocked/claimed)',
  })
  @Column('varchar', { length: 255 })
  name!: string;

  @Field(() => String, {
    nullable: true,
    description: 'Badge description (visible only when unlocked/claimed)',
  })
  @Column('text', { nullable: true })
  description!: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'URL to the badge icon image',
  })
  @Column('text', { nullable: true, name: 'icon_url' })
  iconUrl!: string | null;

  @Field(() => Boolean, {
    description: 'Whether the badge is currently active and can be earned',
  })
  @Column('boolean', { default: true, name: 'is_active' })
  isActive!: boolean;

  @Field(() => Boolean, {
    description: 'Whether the badge can be earned multiple times',
  })
  @Column('boolean', { default: false, name: 'is_repeatable' })
  isRepeatable!: boolean;

  @Field(() => Number, {
    nullable: true,
    description:
      'Maximum number of times the badge can be earned (null = unlimited)',
  })
  @Column('int', {
    nullable: true,
    name: 'max_count',
    default: 1,
  })
  maxCount!: number | null;

  @Field(() => Number, {
    description: 'Display order in badge lists',
  })
  @Column('int', { default: 0, name: 'sort_order' })
  sortOrder!: number;

  @Field(() => String, {
    description: 'Badge rarity: common, rare, epic, legendary',
  })
  @Column('enum', {
    enum: BadgeRarity,
    enumName: 'badge_rarity',
    default: BadgeRarity.COMMON,
  })
  rarity!: BadgeRarity;

  @Field(() => Date, {
    description: 'When the badge was created',
  })
  @Column('timestamp with time zone', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;

  @Field(() => Date, {
    description: 'When the badge was last updated',
  })
  @Column('timestamp with time zone', {
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt!: Date;

  // Relations
  @OneToMany(() => BadgeConditionEntity, (condition) => condition.badge)
  conditions?: BadgeConditionEntity[];

  @OneToMany(() => UserBadgeEntity, (userBadge) => userBadge.badge)
  userBadges?: UserBadgeEntity[];
}
