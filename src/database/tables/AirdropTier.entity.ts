import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, BaseEntity, Column } from 'typeorm';
import { AirdropTiersName } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_tiers' })
export class AirdropTier extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => AirdropTiersName)
  @Column('enum', { enum: AirdropTiersName, enumName: 'airdrop_tiers_name' })
  name!: AirdropTiersName;

  @Field(() => Number)
  @Column('integer')
  totalXp!: number;

  @Field(() => Number)
  @Column('integer')
  totalChestsCount!: number;
}
