import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { ArenaSeason } from '.';

@ObjectType()
class ChestCount {
  @Field(() => String)
  name!: string;

  @Field(() => Number)
  count!: number;
}

@ObjectType()
@Entity({ name: 'arena_seasons_chest' })
export class ArenaSeasonChest extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @Column('text', { nullable: true })
  division!: string;

  @Field(() => String)
  @Column('text', { nullable: true })
  rank!: string;

  @Field(() => [ChestCount])
  @Column('jsonb', { default: [] })
  chestCount!: ChestCount[];
}
