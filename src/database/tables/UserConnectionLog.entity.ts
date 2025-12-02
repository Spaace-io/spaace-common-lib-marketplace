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
import { User } from './User.entity';

@ObjectType()
@Entity({ name: 'user_connection_logs' })
@Index(['userAddress', 'timestamp'])
@Index(['ipAddress'])
@Index(['fingerprint'])
@Index(['actionType'])
@Index(['suspicious'], { where: '"suspicious" = true' })
export class UserConnectionLog extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userAddress', referencedColumnName: 'address' })
  userAddress!: string;

  @Field(() => String)
  @Column('varchar', { length: 45 })
  ipAddress!: string;

  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 100, nullable: true })
  fingerprint!: string | null;

  @Field(() => String)
  @Column('varchar', { length: 50 })
  actionType!: string;

  @Field(() => String, { nullable: true })
  @Column('jsonb', { nullable: true })
  actionData!: Record<string, unknown> | null;

  @Field(() => Date)
  @Column('timestamptz', { default: () => 'NOW()' })
  timestamp!: Date;

  @Field(() => Boolean)
  @Column('boolean', { default: false })
  suspicious!: boolean;
}
