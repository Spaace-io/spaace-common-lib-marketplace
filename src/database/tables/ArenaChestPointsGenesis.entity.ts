import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'arena_chest_points_genesis' })
export class ArenaChestPointsGenesis extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true, default: '0' })
  chestNumber!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  xp!: string;
}
