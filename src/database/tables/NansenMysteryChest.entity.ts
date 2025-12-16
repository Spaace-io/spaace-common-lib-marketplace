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
import { NansenAirdropParticipant } from './NansenAirdropParticipant.entity';
import {
  NansenChestType,
  NansenChestStatus,
} from '../enums/NansenAirdrop.enum';
import { LoyaltyRank } from './SeasonRank.entity';

@ObjectType()
@Entity({ name: 'nansen_mystery_chests' })
@Index('IDX_nansen_chests_participant', ['participantId'])
@Index('IDX_nansen_chests_status', ['status'])
@Index('IDX_nansen_chests_type', ['chestType'])
export class NansenMysteryChest extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => NansenAirdropParticipant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'participantId', referencedColumnName: 'id' })
  participantId!: number;

  @Field(() => NansenChestType)
  @Column('enum', { enum: NansenChestType, enumName: 'nansen_chest_type' })
  chestType!: NansenChestType;

  @Field(() => LoyaltyRank, { nullable: true })
  @Column('enum', {
    enum: LoyaltyRank,
    enumName: 'rank',
    nullable: true,
  })
  unlockRequirement!: LoyaltyRank | null;

  @Field(() => NansenChestStatus)
  @Column('enum', {
    enum: NansenChestStatus,
    enumName: 'nansen_chest_status',
    default: NansenChestStatus.LOCKED,
  })
  status!: NansenChestStatus;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  unlockedAt!: Date | null;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  claimedAt!: Date | null;
}
