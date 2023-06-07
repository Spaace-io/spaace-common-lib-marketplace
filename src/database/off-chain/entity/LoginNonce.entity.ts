import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './User.entity';

import { Field, ObjectType } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
export const LOGIN_NONCE_VALID_PERIOD = 5 * 60 * 1000;

@ObjectType()
@Entity()
export class LoginNonce {
  @Field()
  @PrimaryColumn('char', { length: 32 })
  nonce!: string;

  @BeforeInsert()
  generateUuid() {
      this.nonce = randomUUID().replace(/-/g, '');
  }

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user', referencedColumnName: 'address' })
  user!: User;

  @Field()
  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;
}
