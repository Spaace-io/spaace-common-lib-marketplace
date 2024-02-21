import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { ArenaDivision, ArenaSeason } from '.';

@ObjectType()
@Entity({ name: 'arena_leagues' })
export class ArenaLeague extends BaseEntity {
  @Field(() => Number)
  @PrimaryColumn('integer')
  leagueNumber!: number;

  @Field(() => Number)
  @Column('integer')
  numberOfUsers!: number;

  @Field(() => String)
  @Column('text')
  divisionNumber!: string;

  @ManyToOne(() => ArenaDivision)
  @JoinColumn({ name: 'divisionNumber', referencedColumnName: 'divisionName' })
  division!: ArenaDivision;

  @Field(() => String)
  @Column('text')
  seasonNumber!: string;

  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  season!: ArenaSeason;
}
