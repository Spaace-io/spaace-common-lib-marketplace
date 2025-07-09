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
import { AirdropUser } from './AirdropUser.entity';
import { AirdropChest } from './AirdropChest.entity';
import { AirdropUsersChestsStatus } from '../enums/Airdrops.enum';

@ObjectType()
@Entity({ name: 'airdrop_users_chests' })
@Index('IDX_airdrop_users_chests_address', ['address'])
@Index('IDX_airdrop_users_chests_status', ['status'])
export class AirdropUserChest extends BaseEntity {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column('varchar')
  @ManyToOne(() => AirdropUser, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'address', referencedColumnName: 'address' })
  address!: string;

  @Field(() => Number)
  @Column('integer')
  @ManyToOne(() => AirdropChest, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chestId', referencedColumnName: 'id' })
  chestId!: number;

  @Field(() => AirdropUsersChestsStatus)
  @Column('enum', {
    enum: AirdropUsersChestsStatus,
    enumName: 'users_chests_status',
    default: AirdropUsersChestsStatus.LOCKED,
  })
  status!: AirdropUsersChestsStatus;
}
