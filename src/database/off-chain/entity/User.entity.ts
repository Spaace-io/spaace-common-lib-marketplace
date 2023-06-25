import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Entity, PrimaryColumn, BaseEntity } from 'typeorm';
import { ethers } from 'ethers';

@ObjectType()
@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn('char', { length: 40 })
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  address!: string;
}
