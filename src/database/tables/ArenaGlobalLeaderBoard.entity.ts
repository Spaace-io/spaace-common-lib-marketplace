import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArenaUser } from './ArenaUser.entity';

@ObjectType()
@Entity({ name: 'arena_global_leaderboard' })
export class ArenaGlobalLeaderBoard extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  @ManyToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitter', referencedColumnName: 'userTwitterId' })
  userTwitter!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  position!: string;
}
