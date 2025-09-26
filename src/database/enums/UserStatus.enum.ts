import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  REVIEW = 'REVIEW',
  BLACKLIST = 'BLACKLIST',
  DELETED = 'DELETED',
}

registerEnumType(UserStatus, { name: 'UserStatus' });
