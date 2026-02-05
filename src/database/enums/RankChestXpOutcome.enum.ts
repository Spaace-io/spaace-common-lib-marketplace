import { registerEnumType } from '@nestjs/graphql';

export enum RankChestXpOutcome {
  NONE = 'NONE',
  SMALL = 'SMALL',
  MID_LOW = 'MID_LOW',
  MID_HIGH = 'MID_HIGH',
  HIGH = 'HIGH',
}
registerEnumType(RankChestXpOutcome, { name: 'RankChestXpOutcome' });
