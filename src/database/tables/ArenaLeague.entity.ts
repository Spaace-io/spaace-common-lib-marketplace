import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArenaSeason } from './ArenaSeason.entity';
import { ArenaDivision } from './ArenaDivision.entity';

@ObjectType()
@Entity({ name: 'arena_leagues' })
export class ArenaLeague extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @PrimaryColumn('text')
  @ManyToOne(() => ArenaDivision)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'divisionName', referencedColumnName: 'name' },
  ])
  divisionName!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  leagueNumber!: string;

  @Field(() => String)
  @Column('numeric')
  numberOfUsers!: string;
}
