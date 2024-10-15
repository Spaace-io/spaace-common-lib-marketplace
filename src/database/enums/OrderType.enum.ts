import { registerEnumType } from '@nestjs/graphql';

export enum OrderType {
  ASK = 'ASK',
  BID = 'BID',
  ENGLISH_AUCTION = 'ENGLISH_AUCTION',
  DUTCH_AUCTION = 'DUTCH_AUCTION',
}

registerEnumType(OrderType, {
  name: 'OrderType',
});
