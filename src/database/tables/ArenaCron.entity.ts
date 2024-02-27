import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_crons' })
export class ArenaCron extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  name!: string;

  @Field(() => Date)
  @Column({ type: 'timestamp' })
  lastProcessedTime!: Date;
}
