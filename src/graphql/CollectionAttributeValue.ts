import { Field, ObjectType } from '@nestjs/graphql';
import { Order, Sale } from '..';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ObjectType()
export class CollectionAttributeValue {
  @Field(() => String)
  collectionAddress!: string;

  @Field(() => String)
  trait!: string;

  @Field(() => String)
  value!: string;

  @Field(() => String)
  count!: string;

  // GraphQL only fields

  @Field(() => String)
  listedCount?: string;

  @Field(() => Order, { nullable: true })
  buyNow?: Order | null;

  @Field(() => Order, { nullable: true })
  sellNow?: Order | null;

  @Field(() => Sale, { nullable: true })
  @Type(() => Sale)
  @ValidateNested()
  lastSale?: Sale | null;
}
