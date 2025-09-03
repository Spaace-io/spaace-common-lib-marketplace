import { registerEnumType } from '@nestjs/graphql';

export enum EmailStatus {
  UNSET = 'UNSET',
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
}

registerEnumType(EmailStatus, {
  name: 'EmailStatus',
});
