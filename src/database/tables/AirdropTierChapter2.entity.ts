import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { AirdropTiersNameChapter2 } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_tiers_chapter2' })
export class AirdropTierChapter2 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => AirdropTiersNameChapter2)
  @Column('enum', {
    enum: AirdropTiersNameChapter2,
    enumName: 'airdrop_tiers_name_chapter2',
  })
  name!: AirdropTiersNameChapter2;

  @Field(() => Number)
  @Column('integer')
  totalXp!: number;

  @Field(() => Number)
  @Column('integer')
  totalChestsCount!: number;
}
