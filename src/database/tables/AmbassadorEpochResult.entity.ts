import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'ambassador_epoch_results' })
@Index(['epochId', 'rank'])
export class AmbassadorEpochResult extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('uuid')
  epochId!: string;

  @Field(() => String)
  @PrimaryColumn('char', { length: 40 })
  userAddress!: string;

  @Field(() => Number)
  @Column('int')
  rank!: number;

  @Field(() => Number)
  @Column('int')
  scoreBp!: number;

  @Column({ type: 'timestamp without time zone', default: () => 'NOW()' })
  archivedAt!: Date;
}
