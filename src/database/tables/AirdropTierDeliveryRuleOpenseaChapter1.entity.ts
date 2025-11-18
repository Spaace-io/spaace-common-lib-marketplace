import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AirdropTierOpenseaChapter1 } from './AirdropTierOpenseaChapter1.entity';
import { AirdropChestOpenseaChapter1 } from './AirdropChestOpenseaChapter1.entity';

@ObjectType()
@Entity({ name: 'airdrop_tiers_delivery_rules_opensea_chapter1' })
export class AirdropTierDeliveryRuleOpenseaChapter1 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropTierOpenseaChapter1, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tierId', referencedColumnName: 'id' })
  tierId!: number;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropChestOpenseaChapter1, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chestId', referencedColumnName: 'id' })
  chestId!: number;

  @Field(() => Number)
  @Column('integer')
  count!: number;
}
