import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { AirdropChestsTypeChapter2 } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_chests_chapter2' })
export class AirdropChestChapter2 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => AirdropChestsTypeChapter2)
  @Column('enum', {
    enum: AirdropChestsTypeChapter2,
    enumName: 'airdrop_chests_type_chapter2',
  })
  name!: AirdropChestsTypeChapter2;

  @Field(() => Number)
  @Column('integer')
  valueXp!: number;
}
