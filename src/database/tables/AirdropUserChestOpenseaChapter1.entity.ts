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
import { AirdropUserOpenseaChapter1 } from './AirdropUserOpenseaChapter1.entity';
import { AirdropChestOpenseaChapter1 } from './AirdropChestOpenseaChapter1.entity';
import { AirdropUsersChestsStatusOpenseaChapter1 } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_users_chests_opensea_chapter1' })
@Index('IDX_airdrop_users_chests_opensea_chapter1_address', ['address'])
@Index('IDX_airdrop_users_chests_opensea_chapter1_status', ['status'])
export class AirdropUserChestOpenseaChapter1 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column('varchar')
  @ManyToOne(() => AirdropUserOpenseaChapter1, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'address', referencedColumnName: 'address' })
  address!: string;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropChestOpenseaChapter1, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chestId', referencedColumnName: 'id' })
  chestId!: number;

  @Field(() => AirdropUsersChestsStatusOpenseaChapter1)
  @Column('enum', {
    enum: AirdropUsersChestsStatusOpenseaChapter1,
    enumName: 'users_chests_status_opensea_chapter1',
    default: AirdropUsersChestsStatusOpenseaChapter1.UNLOCKED,
  })
  status!: AirdropUsersChestsStatusOpenseaChapter1;
}

