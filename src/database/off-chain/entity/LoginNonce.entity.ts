import { BeforeInsert, Column, Entity, PrimaryColumn } from 'typeorm';

import { Field, ObjectType } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';

export const LOGIN_NONCE_VALID_PERIOD = 5 * 60 * 1000;

@ObjectType()
@Entity()
export class LoginNonce {
  @Field(() => String)
  @PrimaryColumn('char', { length: 32 })
  nonce!: string;

  @Field(() => String)
  @Column('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;

  @Field(() => Date)
  @Column('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' })
  timestamp!: Date;

  @BeforeInsert()
  generateNonce() {
    this.nonce ??= randomUUID().replace(/-/g, '');
  }
}
