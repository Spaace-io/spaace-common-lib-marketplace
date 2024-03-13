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
    referencedColumnName: 'userTwitterId',
  })
  owner!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  description!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  discord!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  banner!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  profile!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalMembers!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalStarsEarned!: string;
}
