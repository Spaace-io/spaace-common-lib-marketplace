import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum ArenaTiers {
  TIER_1 = '1',
  TIER_2 = '2',
  TIER_3 = '3',
  TIER_4 = '4',
  TIER_5 = '5',
}

registerEnumType(ArenaTiers, { name: 'ArenaTiers' });

@ObjectType()
class Tier {
  @Field(() => ArenaTiers)
  tierNumber!: ArenaTiers;

  @Field(() => Number)
  probability!: number;

  @Field(() => Number)
  coefficient!: number;
}

@ObjectType()
@Entity({ name: 'arena_seasons_chest_genesis' })
export class ArenaSeasonChestGenesis extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  minChestCount!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  maxChestCount!: string;

  @Field(() => [Tier])
  @Column('jsonb', { default: [] })
  tiers!: Tier[];
}
