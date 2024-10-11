import { registerEnumType } from '@nestjs/graphql';

export enum ArenaDivisionName {
  DIAMOND = 'DIAMOND',
  PLATINUM = 'PLATINUM',
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  BRONZE = 'BRONZE',
}

registerEnumType(ArenaDivisionName, { name: 'ArenaDivisionName' });
