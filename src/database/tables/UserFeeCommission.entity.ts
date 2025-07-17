import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  Entity,
  BaseEntity,
  Column,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'users_fee_commission' })
@Index(['address', 'day'], { unique: true })
export class UserFeeCommission extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address: string;

  @Field(() => String)
  @Column('character varying', { length: 10 })
  day: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, default: '0' })
  accumulated: string;

  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
