import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';

@ObjectType()
export class CollectionAttribute {
  @Field(() => String)
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  collectionAddress!: string;

  @Field(() => String)
  trait!: string;

  @Field(() => String)
  value!: string;

  @Field(() => String)
  count!: string;
}
