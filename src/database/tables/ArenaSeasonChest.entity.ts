import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import { ArenaSeason, ArenaDivision, ArenaDivisionName } from '.';
import { ValidateNested } from 'class-validator';

@ObjectType()
class ChestCount {
  @Field(() => String)
  name!: string;

  @Field(() => Number)
  count!: number;
}

@ObjectType()
@Entity({ name: 'arena_seasons_chest' })
@Unique(['seasonNumber', 'divisionName', 'rank'])
export class ArenaSeasonChest extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => ArenaDivisionName)
  @PrimaryColumn('enum', {
    enum: ArenaDivisionName,
    enumName: 'arena_divison_name',
  })
  @ManyToOne(() => ArenaDivision)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'divisionName', referencedColumnName: 'name' },
  ])
  @ValidateNested()
  divisionName!: ArenaDivisionName;

  @Field(() => String)
  @Column('text', { nullable: true })
  rank!: string;

  @Field(() => [ChestCount])
  @Column('jsonb', { default: [] })
  chestCount!: ChestCount[];
}
