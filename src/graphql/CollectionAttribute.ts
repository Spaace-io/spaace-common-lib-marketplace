import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CollectionAttributeValue } from '.';

@ObjectType()
export class CollectionAttribute {
  @Field(() => String)
  collectionAddress!: string;

  @Field(() => String)
  trait!: string;

  @Field(() => [CollectionAttributeValue])
  @Type(() => CollectionAttributeValue)
  @ValidateNested({ each: true })
  values!: CollectionAttributeValue[];
}
