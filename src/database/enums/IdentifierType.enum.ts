import { registerEnumType } from '@nestjs/graphql';

export enum IdentifierType {
  WALLET = 'wallet',
  EMAIL = 'email',
  DISCORD = 'discord',
  TWITTER = 'twitter',
}

registerEnumType(IdentifierType, { name: 'IdentifierType' });
