import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { AirdropTiersNameOpenseaChapter1 } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_tiers_opensea_chapter1' })
export class AirdropTierOpenseaChapter1 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => AirdropTiersNameOpenseaChapter1)
  @Column('enum', {
    enum: AirdropTiersNameOpenseaChapter1,
    enumName: 'airdrop_tiers_name_opensea_chapter1',
  })
  name!: AirdropTiersNameOpenseaChapter1;

  @Field(() => Number)
  @Column('integer')
  totalXp!: number;

  @Field(() => Number)
  @Column('integer')
  totalChestsCount!: number;
}
