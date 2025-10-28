import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column, Index } from 'typeorm';

@ObjectType()
@Entity({ name: 'device_fingerprints' })
@Index(['riskScore'])
@Index(['totalUsers'])
@Index(['suspicious'], { where: '"suspicious" = true' })
@Index(['lastSeen'])
export class DeviceFingerprint extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('varchar', { length: 100 })
  fingerprintHash!: string;

  @Field(() => Number)
  @Column('integer', { default: 0 })
  totalUsers!: number;

  @Field(() => Number)
  @Column('integer', { default: 0 })
  activeUsers!: number;

  @Field(() => Number)
  @Column('integer', { default: 0 })
  bannedUsers!: number;

  @Field(() => Date)
  @Column('timestamptz', { default: () => 'NOW()' })
  firstSeen!: Date;

  @Field(() => Date)
  @Column('timestamptz', { default: () => 'NOW()' })
  lastSeen!: Date;

  @Field(() => Number)
  @Column('integer', { default: 0 })
  riskScore!: number; // 0-100

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  suspicious!: boolean;
}
