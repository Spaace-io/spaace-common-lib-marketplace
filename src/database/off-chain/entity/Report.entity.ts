import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

import { ethers } from 'ethers';

export enum ReportReason {
  FAKE = 'FAKE',
  EXPLICIT = 'EXPLICIT',
  SPAM = 'SPAM',
  OTHER = 'OTHER',
}

registerEnumType(ReportReason, {
  name: 'ReportReason',
});

@ObjectType()
@Entity({ name: 'reports' })
export class Report extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String, { nullable: true })
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  tokenId!: string | null;

  @Field(() => ReportReason)
  @Column('enum', { enum: ReportReason, enumName: 'report_reason' })
  reason!: ReportReason;
}
