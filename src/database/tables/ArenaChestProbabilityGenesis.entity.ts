import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_chest_probability_genesis' })
export class ArenaChestProbabilityGenesis extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  minLevel!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  maxLevel!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  probability!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  maxChest!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  maxLevelWithoutChest!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  minLevelBetweenChest!: string;
}
