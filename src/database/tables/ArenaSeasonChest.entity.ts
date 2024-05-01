import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';
import { ArenaDivisionName, ArenaChestName } from '.';

@ObjectType()
class ChestCount {
  @Field(() => ArenaChestName)
  name!: ArenaChestName;

  @Field(() => Number)
  count!: number;
}

@ObjectType()
@Entity({ name: 'arena_seasons_chest' })
export class ArenaSeasonChest extends BaseEntity {
  @Field(() => ArenaDivisionName)
  @PrimaryColumn('enum', {
    enum: ArenaDivisionName,
    enumName: 'arena_divison_name',
  })
  divisionName!: ArenaDivisionName;

  @Field(() => String)
  @PrimaryColumn('text')
  rank!: string;

  @Field(() => [ChestCount])
  @Column('jsonb', { default: [] })
  chestCount!: ChestCount[];
}
