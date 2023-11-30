import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';
import { Quest, Season, User } from '.';
import { ethers } from 'ethers';
import { Transform } from 'class-transformer';

@ObjectType()
@Entity({ name: 'user_quest_progress' })
@Index(['userAddress', 'seasonNumber', 'questId'], { where: '"completed"' })
export class UserQuestProgress extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @PrimaryColumn('uuid')
  @ManyToOne(() => Quest)
  @JoinColumn([
    { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
    { name: 'questId', referencedColumnName: 'id' },
  ])
  questId!: string;

  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  nonce!: string;

  @Field(() => [[String]])
  @Column('jsonb')
  data!: string[][];

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  completed!: boolean;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
