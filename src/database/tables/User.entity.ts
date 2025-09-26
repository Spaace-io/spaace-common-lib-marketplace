import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ethers } from 'ethers';
import { AccessLevel } from '../enums/AccessLevel.enum';
import { EmailStatus } from '../enums/EmailStatus.enum';
import { UserStatus } from '../enums/UserStatus.enum';

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

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  pendingEmail: string | null;

  @Field(() => EmailStatus)
  @Column({ type: 'enum', enum: EmailStatus, default: EmailStatus.UNSET })
  emailStatus: EmailStatus;

  @Field(() => Date, {
    nullable: true,
  })
  @Column({ type: 'timestamptz', nullable: true })
  emailVerifiedAt: Date | null;

  @Column({ type: 'varchar', length: 128, nullable: true })
  emailVerificationTokenHash: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  emailVerificationExpiresAt: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  emailVerificationLastSentAt: Date | null;

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

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  sharedReferralImage!: string | null;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  checkedAirdropS1!: boolean;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  discordId!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  discordUsername!: string | null;

  @Column('text', { nullable: true })
  discordAccessToken!: string | null;

  @Column('text', { nullable: true })
  discordRefreshToken!: string | null;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  isAmbassador!: boolean;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 32, nullable: true })
  referralStatus!: 'pending' | 'active' | null;

  @Field(() => UserStatus)
  @Index('idx_users_status')
  @Column('enum', {
    enum: UserStatus,
    enumName: 'users_status_enum',
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Field(() => Number, { nullable: true })
  @Column('integer', { nullable: true })
  abuseScore!: number | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  abuseReason!: string | null;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  statusUpdatedAt!: Date;
}
