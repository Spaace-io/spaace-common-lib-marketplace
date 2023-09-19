import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { BigNumber, ethers } from 'ethers';

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
@Unique(['userAddress', 'collectionAddress', 'tokenId'])
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String, { nullable: true })
  @Column('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  @Transform(
    ({ value }) =>
      value === BigNumber.from(2).pow(256).toString() ? null : value,
    {
      toPlainOnly: true,
    },
  )
  tokenId!: string;

  @Field(() => ReportReason)
  @Column('enum', { enum: ReportReason, enumName: 'report_reason' })
  reason!: ReportReason;
}
