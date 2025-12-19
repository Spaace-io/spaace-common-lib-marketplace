import { registerEnumType } from '@nestjs/graphql';

export enum DiscordTierEnum {
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  PLATINUM = 'PLATINUM',
  DIAMOND = 'DIAMOND',
}

registerEnumType(DiscordTierEnum, {
  name: 'DiscordTier',
});
