import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { ArenaUser } from './ArenaUser.entity';

@ObjectType()
@Entity({ name: 'arena_crews' })
export class ArenaCrew extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  name!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @OneToOne(() => ArenaUser, { nullable: true })
  @JoinColumn({
    name: 'owner',
    referencedColumnName: 'twitterUsername',
  })
  owner!: string | null;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalMembers!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalStarsEarned!: string;
}
