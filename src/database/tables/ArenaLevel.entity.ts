import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_levels' })
export class ArenaLevel extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true, default: '0' })
  level!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  stars!: string;
}
