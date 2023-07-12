import { Field, ObjectType } from '@nestjs/graphql';
import { Order } from '..';

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

  @Field(() => Order, { nullable: true })
  buyNow!: Order | null;

  @Field(() => Order, { nullable: true })
  sellNow!: Order | null;
}
