import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArenaSeason, ArenaDivision } from '.';
import { ValidateNested } from 'class-validator';
import { ArenaDivisionName } from '../enums';

@ObjectType()
@Entity({ name: 'arena_leagues' })
export class ArenaLeague extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
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
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  leagueNumber!: string;

  @Field(() => String)
  @Column('numeric')
  numberOfUsers!: string;
}
