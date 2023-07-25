import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Quest, SeasonRank } from '.';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ObjectType()
@Entity({ name: 'seasons' })
export class Season extends BaseEntity {
  @Field(() => Int)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
  number!: number;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  startDate!: Date;

  @Field(() => Date, { nullable: true })
  @Column('timestamp without time zone', { nullable: true })
  endDate!: Date | null;

  // GraphQL only fields

  @Field(() => [Quest])
  @Type(() => Quest)
  @ValidateNested()
  quests?: Quest[];

  @Field(() => [SeasonRank])
  @Type(() => SeasonRank)
  @ValidateNested()
  ranks?: SeasonRank[];
}
