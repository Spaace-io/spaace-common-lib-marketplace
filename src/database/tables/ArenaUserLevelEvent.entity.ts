import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArenaUser } from '.';

@ObjectType()
@Entity({ name: 'arena_user_level_event' })
export class ArenaUserLevelEvent extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  @ManyToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitterId', referencedColumnName: 'userTwitterId' })
  userTwitterId!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  oldLevel!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  newLevel!: string;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  inProcess!: boolean;
}
