import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { ArenaUser, ArenaSeason, ArenaChestName } from '.';

@ObjectType()
@Entity({ name: 'arena_users_earned_chest' })
@Index(['userTwitterId', 'id'])
export class ArenaUserEarnedChest extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  @ManyToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitterId', referencedColumnName: 'userTwitterId' })
  userTwitterId!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true })
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  xp!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  stars!: string;

  @Field(() => ArenaChestName)
  @Column('text')
  chestName!: ArenaChestName;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isClaimed!: boolean;
}
