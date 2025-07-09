import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ethers } from 'ethers';
import { AccessLevel } from '../enums/AccessLevel.enum';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true, unique: true })
  name!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  email!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  biography!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  imageUrl!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  bannerUrl!: string | null;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  admin!: boolean;

  @Field(() => String)
  @Column('text', { unique: true })
  referralCode!: string;

  @Field(() => String, { nullable: true })
  @Column('char', { length: 40, nullable: true })
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'referrerAddress', referencedColumnName: 'address' })
  @Transform(
    ({ value }) => (value !== null ? ethers.utils.getAddress(value) : null),
    {
      toPlainOnly: true,
    },
  )
  referrerAddress!: string | null;

  @Field(() => AccessLevel)
  @Column('enum', {
    enum: AccessLevel,
    enumName: 'access_level',
    default: AccessLevel.LOCKED,
  })
  accessLevel!: AccessLevel;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  twitterUsername!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  twitterId!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  twitterSecretToken!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  twitterAccessToken!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  sharedAirdropOGImage!: string | null;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  checkedAirdropS1!: boolean;
}
