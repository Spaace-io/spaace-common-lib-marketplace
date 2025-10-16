import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { AirdropChestsTypeChapter1 } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_chests_chapter1' })
export class AirdropChestChapter1 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => AirdropChestsTypeChapter1)
  @Column('enum', {
    enum: AirdropChestsTypeChapter1,
    enumName: 'airdrop_chests_type_chapter1',
  })
  name!: AirdropChestsTypeChapter1;

  @Field(() => Number)
  @Column('integer')
  valueXp!: number;
}
