import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryColumn, BaseEntity, Column } from 'typeorm';

export enum ArenaChestName {
  MYTIC = 'MYTIC',
  LEGENDARY = 'LEGENDARY',
  RARE = 'RARE',
  UNCOMMON = 'UNCOMMON',
  COMMON = 'COMMON',
  GENESIS = 'GENESIS',
}

registerEnumType(ArenaChestName, { name: 'ArenaChestName' });

@ObjectType()
@Entity({ name: 'arena_chest_points' })
export class ArenaChestPoints extends BaseEntity {
  @Field(() => ArenaChestName)
  @PrimaryColumn('enum', {
    enum: ArenaChestName,
    enumName: 'arena_chest_name',
  })
  name!: ArenaChestName;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  xp!: string;
}
