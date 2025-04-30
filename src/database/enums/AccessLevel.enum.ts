import { registerEnumType } from '@nestjs/graphql';

export enum AccessLevel {
  LOCKED = 'LOCKED',
  INVITED = 'INVITED',
  WHITELISTED = 'WHITELISTED',
}

registerEnumType(AccessLevel, {
  name: 'AccessLevel',
});
