import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { AirdropTierChapter2 } from './AirdropTierChapter2.entity';
import { LoyaltyRank } from './SeasonRank.entity';

@ObjectType()
@Entity({ name: 'airdrop_users_chapter2' })
@Index('IDX_airdrop_users_chapter2_address', ['address'])
export class AirdropUserChapter2 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column('varchar', { unique: true })
  address!: string;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropTierChapter2, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tierId', referencedColumnName: 'id' })
  tierId!: number;

  @Field(() => LoyaltyRank)
  @Column('enum', {
    enum: LoyaltyRank,
    enumName: 'rank',
    default: LoyaltyRank.BRONZE_4,
  })
  rank!: LoyaltyRank;

  @Field(() => Number)
  @Column('integer', { default: 0 })
  points!: number;
}
