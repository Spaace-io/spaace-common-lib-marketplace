import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  Unique,
  Index,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PartnerChestUnlockLevel } from '../enums/PartnerChestUnlockLevel.enum';
import { PartnerChestUserRun } from './PartnerChestUserRun.entity';

@ObjectType()
@Entity({ name: 'partner_chest_claims' })
@Unique('uq_partner_chest_claim_user_run_level', ['userRunId', 'unlockLevel'])
@Index(['userRunId'])
export class PartnerChestClaim extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('uuid')
  userRunId!: string;

  @ManyToOne(() => PartnerChestUserRun, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userRunId', referencedColumnName: 'id' })
  userRun!: PartnerChestUserRun;

  @Field(() => PartnerChestUnlockLevel)
  @Column('enum', {
    enum: PartnerChestUnlockLevel,
    enumName: 'partner_chest_unlock_level_enum',
  })
  unlockLevel!: PartnerChestUnlockLevel;

  @Field(() => Date)
  @Column({ type: 'timestamptz', default: () => 'NOW()' })
  claimedAt!: Date;
}
