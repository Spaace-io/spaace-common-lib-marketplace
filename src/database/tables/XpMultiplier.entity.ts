import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';
import { Season, User } from '.';
import { ethers } from 'ethers';
import { Transform } from 'class-transformer';

@ObjectType()
export class XpMultiplierMetadata {
  @Field(() => String)
  @Column('text')
  key!: string;

  @Field(() => String)
  @Column('text')
  value!: string;
}

@ObjectType()
@Entity({ name: 'xp_multiplier' })
@Index(['userAddress', 'seasonNumber'])
export class XpMultiplier extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn('increment')
  id!: number;

  @Field(() => String)
  @Column('char', { length: 40 })
  @ManyToOne(() => User)
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @ManyToOne(() => Season)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, scale: 2, default: 1.0 })
  multiplier!: number;

  @Field(() => [XpMultiplierMetadata])
  @Column('jsonb')
  metadata!: XpMultiplierMetadata[];

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true, default: null })
  expiresAt!: Date | null;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;
}
