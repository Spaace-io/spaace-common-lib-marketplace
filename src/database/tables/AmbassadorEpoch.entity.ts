import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum AmbassadorEpochStatus {
  DRAFT = 'DRAFT',
  SCHEDULED = 'SCHEDULED',
  LIVE = 'LIVE',
  ENDED = 'ENDED',
}

registerEnumType(AmbassadorEpochStatus, { name: 'AmbassadorEpochStatus' });

@ObjectType()
@Entity({ name: 'ambassador_epochs' })
@Index(['status', 'startAt'])
@Index(['status', 'endAt'])
export class AmbassadorEpoch extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('text')
  title!: string;

  @Field(() => Date)
  @Column({ type: 'timestamp without time zone' })
  startAt!: Date;

  @Field(() => Date)
  @Column({ type: 'timestamp without time zone' })
  endAt!: Date;

  @Field(() => String)
  @Column('numeric', { precision: 18, scale: 2 })
  rewardPoolUsd!: string;

  @Field(() => Number)
  @Column('int')
  winnersCount!: number;

  @Field(() => AmbassadorEpochStatus)
  @Column('enum', {
    enum: AmbassadorEpochStatus,
    enumName: 'ambassador_epoch_status',
    default: AmbassadorEpochStatus.DRAFT,
  })
  status!: AmbassadorEpochStatus;

  @Column({ type: 'timestamp without time zone', nullable: true })
  lastLeaderboardComputedAt!: Date | null;

  @Column({ type: 'timestamp without time zone', nullable: true })
  finalizedAt!: Date | null;

  @Field(() => Date)
  @Column({ type: 'timestamp without time zone', default: () => 'NOW()' })
  createdAt!: Date;

  @Field(() => Date)
  @Column({ type: 'timestamp without time zone', default: () => 'NOW()' })
  updatedAt!: Date;

  @Column('int', { default: 7 })
  newUsersLookbackDays!: number;
}
