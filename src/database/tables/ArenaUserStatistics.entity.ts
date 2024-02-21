import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { ArenaUser } from './ArenaUser.entity';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'arena_user_statistics' })
export class ArenaUserStatistics extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  @OneToOne(() => ArenaUser)
  @JoinColumn({
    name: 'twitterUsername',
    referencedColumnName: 'twitterUsername',
  })
  twitterUsername!: string;

  @Field(() => Number)
  @Column('integer')
  totalLikes!: number;

  @Field(() => Number)
  @Column('integer')
  totalReposts!: number;
}
