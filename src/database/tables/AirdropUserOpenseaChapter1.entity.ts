import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { AirdropTierOpenseaChapter1 } from './AirdropTierOpenseaChapter1.entity';

@ObjectType()
@Entity({ name: 'airdrop_users_opensea_chapter1' })
@Index('IDX_airdrop_users_opensea_chapter1_address', ['address'])
export class AirdropUserOpenseaChapter1 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column('varchar', { unique: true })
  address!: string;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropTierOpenseaChapter1, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tierId', referencedColumnName: 'id' })
  tierId!: number;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  tierUpgraded!: boolean;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  unlockedLevel1!: boolean;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  unlockedLevel2!: boolean;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  unlockedLevel3!: boolean;
}
