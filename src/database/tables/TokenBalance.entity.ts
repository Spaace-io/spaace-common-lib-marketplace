import { ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'token_balances' })
export class TokenBalanceEntity extends BaseEntity {
  @PrimaryColumn('char', { length: 40 })
  currency!: string;

  @PrimaryColumn('char', { length: 40 })
  userAddress!: string;

  @Column('numeric', { precision: 78, default: '0' })
  balance!: string;
}
