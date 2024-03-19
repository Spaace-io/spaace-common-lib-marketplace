import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ArenaUser } from './ArenaUser.entity';
import { ArenaChestProbabilityGenesis } from './ArenaChestProbabilityGenesis.entity';

@ObjectType()
@Entity({ name: 'arena_users_chest_progress_genesis' })
export class ArenaUserChestProgressGenesis extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn('text')
  @ManyToOne(() => ArenaChestProbabilityGenesis)
  @JoinColumn({ name: 'levelId', referencedColumnName: 'id' })
  levelId!: string;

  @Field(() => String)
  @PrimaryColumn('text')
  @ManyToOne(() => ArenaUser)
  @JoinColumn({ name: 'userTwitter', referencedColumnName: 'userTwitterId' })
  userTwitter!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  totalChestReceived!: string;

  @Field(() => String)
  @Column('numeric', { precision: 78, unsigned: true, default: '0' })
  lastChestReceivedOnLevel!: string;
}
