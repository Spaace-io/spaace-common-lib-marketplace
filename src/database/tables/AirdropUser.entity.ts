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
import { AirdropTier } from './AirdropTier.entity';

@ObjectType()
@Entity({ name: 'airdrop_users' })
@Index('IDX_airdrop_users_address', ['address'])
export class AirdropUser extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column('varchar', { unique: true })
  address!: string;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropTier, { onDelete: 'CASCADE' })
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
