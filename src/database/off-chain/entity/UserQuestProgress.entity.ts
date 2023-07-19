import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Quest, User } from '.';
import { ethers } from 'ethers';
import { Transform } from 'class-transformer';

@ObjectType()
@Entity({ name: 'user_quest_progress' })
export class UserQuestProgress extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => Int)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  seasonNumber!: number;

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

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  completed!: boolean;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
