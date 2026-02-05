import { registerEnumType } from '@nestjs/graphql';

export enum RankChestState {
  CLAIMABLE = 'CLAIMABLE',
  CLAIMED = 'CLAIMED',
}

registerEnumType(RankChestState, { name: 'RankChestState' });
