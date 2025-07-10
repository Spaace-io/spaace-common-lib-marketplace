import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import {
  AirdropChestsType,
  AirdropUsersChestsStatus,
} from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_chests' })
export class AirdropChest extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => AirdropChestsType)
  @Column('enum', { enum: AirdropChestsType, enumName: 'airdrop_chests_type' })
  name!: AirdropChestsType;

  @Field(() => Number)
  @Column('integer')
  valueXp!: number;

  // @Field(() => AirdropUsersChestsStatus)
  // @Column('enum', {
  //   enum: AirdropUsersChestsStatus,
  //   enumName: 'users_chests_status',
  // })
  // status!: AirdropUsersChestsStatus;
}
