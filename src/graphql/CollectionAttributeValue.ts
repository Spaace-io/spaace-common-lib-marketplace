import { Field, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';

@ObjectType()
export class CollectionAttributeValue {
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

  // TODO
  // @Field(() => String)
  // listedCount?: string;

  // @Field(() => Order, { nullable: true })
  // buyNow?: Order | null;

  // @Field(() => Order, { nullable: true })
  // sellNow?: Order | null;

  // @Field(() => Sale, { nullable: true })
  // @Type(() => Sale)
  // @ValidateNested()
  // lastSale?: Sale | null;
}
