import { registerEnumType } from '@nestjs/graphql';

export enum TournamentStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  CALCULATING = 'calculating',
  ENDED = 'ended',
}

registerEnumType(TournamentStatus, { name: 'TournamentStatus' });
