import { Field, ObjectType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CollectionAttributeValue } from '.';
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

  @Field(() => [CollectionAttributeValue])
  @Type(() => CollectionAttributeValue)
  @ValidateNested({ each: true })
  values!: CollectionAttributeValue[];
}
