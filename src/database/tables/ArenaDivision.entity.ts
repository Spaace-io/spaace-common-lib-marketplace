import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ValidateNested } from 'class-validator';
import { ArenaSeason } from '.';

export enum ArenaDivisionName {
  DIAMOND = 'DIAMOND',
  PLATINUM = 'PLATINUM',
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  BRONZE = 'BRONZE',
}

registerEnumType(ArenaDivisionName, { name: 'ArenaDivisionName' });

@ObjectType()
@Entity({ name: 'arena_divisions' })
export class ArenaDivision extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('numeric', { precision: 78, unsigned: true })
  @ManyToOne(() => ArenaSeason)
  @JoinColumn({ name: 'seasonNumber', referencedColumnName: 'number' })
  seasonNumber!: string;

  @Field(() => ArenaDivisionName)
  @PrimaryColumn('enum', {
    enum: ArenaDivisionName,
    enumName: 'arena_divison_name',
  })
  @ValidateNested()
  name!: ArenaDivisionName;

  @Field(() => String)
  @Column('numeric')
  leagueUserMaxCap!: string;
}
