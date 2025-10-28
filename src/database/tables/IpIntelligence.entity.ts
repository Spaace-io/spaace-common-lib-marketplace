import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column, Index } from 'typeorm';

@ObjectType()
@Entity({ name: 'ip_intelligence' })
@Index(['riskScore'])
@Index(['totalUsers'])
@Index(['isBlacklisted'], { where: '"isBlacklisted" = true' })
@Index(['ipType'])
@Index(['countryCode'])
export class IpIntelligence extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('varchar', { length: 45 })
  ipAddress!: string;

  @Field(() => Number)
  @Column('integer', { default: 0 })
  totalUsers!: number;

  @Field(() => Number)
  @Column('integer', { default: 0 })
  activeUsers!: number;

  @Field(() => Number)
  @Column('integer', { default: 0 })
  bannedUsers!: number;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 20, nullable: true })
  ipType!: string | null; // datacenter, vpn, residential, proxy

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 10, nullable: true })
  countryCode!: string | null;

  @Field(() => Number)
  @Column('integer', { default: 0 })
  riskScore!: number; // 0-100

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  isBlacklisted!: boolean;
}
