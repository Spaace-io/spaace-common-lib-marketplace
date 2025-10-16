import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { AirdropTiersNameChapter1 } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_tiers_chapter1' })
export class AirdropTierChapter1 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => AirdropTiersNameChapter1)
  @Column('enum', {
    enum: AirdropTiersNameChapter1,
    enumName: 'airdrop_tiers_name_chapter1',
  })
  name!: AirdropTiersNameChapter1;

  @Field(() => Number)
  @Column('integer')
  totalXp!: number;

  @Field(() => Number)
  @Column('integer')
  totalChestsCount!: number;
}
