import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';
import { Quest, SeasonRank } from '.';
import { Type } from 'class-transformer';

@ObjectType()
@Entity({ name: 'seasons' })
export class Season extends BaseEntity {
  @Field(() => Number)
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
  quests?: Quest[];

  @Field(() => [SeasonRank])
  @Type(() => SeasonRank)
  ranks?: SeasonRank[];
}
