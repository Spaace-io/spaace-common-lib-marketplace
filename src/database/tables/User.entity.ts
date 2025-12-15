import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude, Expose, Transform } from 'class-transformer';
import { ethers } from 'ethers';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { AccessLevel } from '../enums/AccessLevel.enum';
import { EmailStatus } from '../enums/EmailStatus.enum';
import { UserStatus } from '../enums/UserStatus.enum';
import { TournamentParticipant, TournamentResult } from './Tournaments.entity';

@Exclude()
@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field(() => String)
  @Expose()
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true, unique: true })
  @Expose()
  name!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose({ groups: ['me'] })
  email!: string | null;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  @Expose({ groups: ['me'] })
  pendingEmail: string | null;

  @Field(() => EmailStatus)
  @Column({ type: 'enum', enum: EmailStatus, default: EmailStatus.UNSET })
  @Expose({ groups: ['me'] })
  emailStatus: EmailStatus;

  @Field(() => Date, {
    nullable: true,
  })
  @Column({ type: 'timestamptz', nullable: true })
  @Expose({ groups: ['me'] })
  emailVerifiedAt: Date | null;

  @Column({ type: 'varchar', length: 128, nullable: true })
  @Expose({ groups: ['me'] })
  emailVerificationTokenHash: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  @Expose({ groups: ['me'] })
  emailVerificationExpiresAt: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  @Expose({ groups: ['me'] })
  emailVerificationLastSentAt: Date | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose()
  biography!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose()
  imageUrl!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose()
  bannerUrl!: string | null;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  @Expose()
  admin!: boolean;

  @Field(() => String)
  @Column('text', { unique: true })
  @Expose()
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
  @Expose()
  referrerAddress!: string | null;

  @Field(() => AccessLevel)
  @Column('enum', {
    enum: AccessLevel,
    enumName: 'access_level',
    default: AccessLevel.LOCKED,
  })
  @Expose()
  accessLevel!: AccessLevel;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  @Expose()
  timestamp!: Date;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose({ groups: ['me'] })
  twitterUsername!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose({ groups: ['me'] })
  twitterId!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose({ groups: ['me'] })
  twitterSecretToken!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose({ groups: ['me'] })
  twitterAccessToken!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose()
  sharedAirdropOGImage!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose()
  sharedReferralImage!: string | null;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  @Expose({ groups: ['me'] })
  checkedAirdropChapter0!: boolean;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  @Expose({ groups: ['me'] })
  checkedAirdropChapter1!: boolean;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  @Expose({ groups: ['me'] })
  checkedAirdropOpenseaChapter1!: boolean;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose({ groups: ['me'] })
  discordId!: string | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose({ groups: ['me'] })
  discordUsername!: string | null;

  @Column('text', { nullable: true })
  @Expose({ groups: ['me'] })
  discordAccessToken!: string | null;

  @Column('text', { nullable: true })
  @Expose({ groups: ['me'] })
  discordRefreshToken!: string | null;

  @Field(() => Boolean)
  @Column({ type: 'boolean', default: false })
  @Expose()
  isAmbassador!: boolean;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 32, nullable: true })
  @Expose()
  referralStatus!: 'pending' | 'active' | null;

  @Field(() => UserStatus)
  @Index('idx_users_status')
  @Column('enum', {
    enum: UserStatus,
    enumName: 'users_status_enum',
    default: UserStatus.ACTIVE,
  })
  @Expose()
  status!: UserStatus;

  @Field(() => Number, { nullable: true })
  @Column('integer', { nullable: true })
  @Expose()
  abuseScore!: number | null;

  @Field(() => String, { nullable: true })
  @Column('text', { nullable: true })
  @Expose()
  abuseReason!: string | null;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  @Expose()
  checkedAbuseReport!: boolean;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  @Expose()
  statusUpdatedAt!: Date;

  // Anti-bot detection fields
  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 45, nullable: true })
  @Expose()
  creationIP!: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 100, nullable: true })
  @Expose()
  creationFingerprint!: string | null;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 45, nullable: true })
  @Expose()
  lastConnectionIP!: string | null;

  @Field(() => Date, { nullable: true })
  @Column({ type: 'timestamptz', nullable: true })
  @Expose()
  lastConnectionAt!: Date | null;

  @Field(() => [TournamentResult])
  @OneToMany(
    () => TournamentResult,
    (tournamentResult) => tournamentResult.user,
    {
      nullable: true,
    },
  )
  tournamentResults!: TournamentResult[];

  @Field(() => [TournamentParticipant])
  @OneToMany(
    () => TournamentParticipant,
    (tournamentParticipant) => tournamentParticipant.user,
    {
      nullable: true,
    },
  )
  tournamentParticipants!: TournamentParticipant[];
}
