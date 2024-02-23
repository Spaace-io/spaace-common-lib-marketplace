import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_crew_leaderboard' })
export class ArenaCrewLeaderBoard extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  crewName!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  position!: string;
}
