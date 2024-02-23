import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { ArenaSeason } from '.';

@ObjectType()
@Entity({ name: 'arena_divisions' })
export class ArenaDivision extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  divisionName!: string;

  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  season!: ArenaSeason;

  @Field(() => Number)
  @Column('integer')
  leagueUsersMaxCap!: number;
}
