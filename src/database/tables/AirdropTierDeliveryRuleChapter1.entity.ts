import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { AirdropTierChapter1 } from './AirdropTierChapter1.entity';
import { AirdropChestChapter1 } from './AirdropChestChapter1.entity';

@ObjectType()
@Entity({ name: 'airdrop_tiers_delivery_rules_chapter1' })
export class AirdropTierDeliveryRuleChapter1 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropTierChapter1, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tierId', referencedColumnName: 'id' })
  tierId!: number;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropChestChapter1, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chestId', referencedColumnName: 'id' })
  chestId!: number;

  @Field(() => Number)
  @Column('integer')
  count!: number;
}
