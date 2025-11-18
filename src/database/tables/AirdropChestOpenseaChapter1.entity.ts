import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { AirdropChestsTypeOpenseaChapter1 } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_chests_opensea_chapter1' })
export class AirdropChestOpenseaChapter1 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => AirdropChestsTypeOpenseaChapter1)
  @Column('enum', {
    enum: AirdropChestsTypeOpenseaChapter1,
    enumName: 'airdrop_chests_type_opensea_chapter1',
  })
  name!: AirdropChestsTypeOpenseaChapter1;

  @Field(() => Number)
  @Column('integer')
  valueXp!: number;
}
