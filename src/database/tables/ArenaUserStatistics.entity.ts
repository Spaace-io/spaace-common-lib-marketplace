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
    referencedColumnName: 'userTwitterId',
  })
  twitterUsername!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  totalLikes!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  totalReposts!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  totalReplies!: string;

  @Field(() => Number)
  @Column('numeric', { precision: 78, unsigned: true, default: 0 })
  totalQuotes!: string;
}
