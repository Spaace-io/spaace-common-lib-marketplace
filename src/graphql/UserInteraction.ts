import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { ethers } from 'ethers';

export enum UserInteractionType {
  DAILY_CLAIM = 'DAILY_CLAIM',
  BUY_NOW = 'BUY_NOW',
  SELL_INSTANTLY = 'SELL_INSTANTLY',
  SWEEP_FLOOR = 'SWEEP_FLOOR',
}

registerEnumType(UserInteractionType, {
  name: 'UserInteractionType',
});

@ObjectType()
export class UserInteraction {
  @Field(() => UserInteractionType)
  type!: UserInteractionType;

  @Field(() => String)
  @Transform(({ value }) => ethers.utils.getAddress(value), {
    toPlainOnly: true,
  })
  userAddress!: string;
}
