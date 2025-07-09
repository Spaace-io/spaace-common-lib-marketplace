import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AirdropTier } from './AirdropTier.entity';
import { AirdropChest } from './AirdropChest.entity';

@ObjectType()
@Entity({ name: 'airdrop_tiers_delivery_rules' })
export class AirdropTierDeliveryRule extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropTier, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tierId', referencedColumnName: 'id' })
  tierId!: number;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropChest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chestId', referencedColumnName: 'id' })
  chestId!: number;

  @Field(() => Number)
  @Column('integer')
  count!: number;
}
