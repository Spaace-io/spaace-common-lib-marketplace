import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  Unique,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum ArenaCrewChestTiers {
  TIER_1 = '1',
  TIER_2 = '2',
  TIER_3 = '3',
}

registerEnumType(ArenaCrewChestTiers, { name: 'ArenaCrewChestTiers' });

@ObjectType()
class Tier {
  @Field(() => ArenaCrewChestTiers)
  tierNumber!: ArenaCrewChestTiers;

  @Field(() => Number)
  xp!: number;
}

@ObjectType()
@Entity({ name: 'arena_crew_chest_points' })
@Unique(['minRank', 'maxRank'])
export class ArenaCrewChestPoint extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  minRank!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  maxRank!: string;

  @Field(() => [Tier])
  @Column('jsonb', { default: [] })
  tiers!: Tier[];
}
