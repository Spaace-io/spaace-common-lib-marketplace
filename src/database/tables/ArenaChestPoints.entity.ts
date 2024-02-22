import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_chest_points' })
export class ArenaChestPoints extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  name!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  xp!: string;
}
