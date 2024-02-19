import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_users' })
export class ArenaUser extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  twitterUsername!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  name!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  imageUrl!: string | null;

  @Field(() => String)
  @Column('text', { unique: true })
  referralCode!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @ManyToOne(() => ArenaUser, { nullable: true })
  @JoinColumn({
    name: 'referrerUsername',
    referencedColumnName: 'twitterUsername',
  })
  referrerUsername!: string | null;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
