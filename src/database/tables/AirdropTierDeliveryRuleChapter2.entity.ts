import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AirdropTierChapter2 } from './AirdropTierChapter2.entity';
import { AirdropChestChapter2 } from './AirdropChestChapter2.entity';

@ObjectType()
@Entity({ name: 'airdrop_tiers_delivery_rules_chapter2' })
export class AirdropTierDeliveryRuleChapter2 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropTierChapter2, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tierId', referencedColumnName: 'id' })
  tierId!: number;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropChestChapter2, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chestId', referencedColumnName: 'id' })
  chestId!: number;

  @Field(() => Number)
  @Column('integer')
  count!: number;
}
