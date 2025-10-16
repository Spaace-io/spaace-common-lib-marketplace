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
import { AirdropUserChapter1 } from './AirdropUserChapter1.entity';
import { AirdropChestChapter1 } from './AirdropChestChapter1.entity';
import { AirdropUsersChestsStatusChapter1 } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_users_chests_chapter1' })
@Index('IDX_airdrop_users_chests_chapter1_address', ['address'])
@Index('IDX_airdrop_users_chests_chapter1_status', ['status'])
export class AirdropUserChestChapter1 extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column('varchar')
  @ManyToOne(() => AirdropUserChapter1, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'address', referencedColumnName: 'address' })
  address!: string;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropChestChapter1, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chestId', referencedColumnName: 'id' })
  chestId!: number;

  @Field(() => AirdropUsersChestsStatusChapter1)
  @Column('enum', {
    enum: AirdropUsersChestsStatusChapter1,
    enumName: 'users_chests_status_chapter1',
    default: AirdropUsersChestsStatusChapter1.UNLOCKED,
  })
  status!: AirdropUsersChestsStatusChapter1;
}
