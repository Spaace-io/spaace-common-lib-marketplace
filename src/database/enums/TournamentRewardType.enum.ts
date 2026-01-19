import { registerEnumType } from '@nestjs/graphql';

export enum TournamentRewardType {
  XP = 'XP',
  USD = 'USD',
}

registerEnumType(TournamentRewardType, {
  name: 'TournamentRewardType',
  description: 'Type of reward for tournament: XP or USD (Spaace tokens)',
});
