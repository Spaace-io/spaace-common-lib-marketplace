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
import { AirdropUserChapter2 } from './AirdropUserChapter2.entity';
import { AirdropChestChapter2 } from './AirdropChestChapter2.entity';
import { AirdropUsersChestsStatusChapter2 } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_users_chests_chapter2' })
@Index('IDX_airdrop_users_chests_chapter2_address', ['address'])
@Index('IDX_airdrop_users_chests_chapter2_status', ['status'])
export class AirdropUserChestChapter2 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column('varchar')
  @ManyToOne(() => AirdropUserChapter2, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'address', referencedColumnName: 'address' })
  address!: string;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropChestChapter2, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chestId', referencedColumnName: 'id' })
  chestId!: number;

  @Field(() => AirdropUsersChestsStatusChapter2)
  @Column('enum', {
    enum: AirdropUsersChestsStatusChapter2,
    enumName: 'users_chests_status_chapter2',
    default: AirdropUsersChestsStatusChapter2.UNLOCKED,
  })
  status!: AirdropUsersChestsStatusChapter2;
}
