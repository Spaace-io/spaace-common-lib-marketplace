import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

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
  userAddress!: string;
}
