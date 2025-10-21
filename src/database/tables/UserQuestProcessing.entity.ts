import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';
import { ethers } from 'ethers';
import { Transform } from 'class-transformer';

@Entity({ name: 'user_quest_processing' })
export class UserQuestProcessing extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @PrimaryColumn({ type: 'uuid' })
  questId!: string;

  @PrimaryColumn({ type: 'text' })
  seasonNumber!: string;

  @PrimaryColumn({ type: 'text' })
  scopeKey!: string;

  @Column({ type: 'timestamptz', default: () => 'now()' })
  createdAt!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  completedAt!: Date | null;
}
