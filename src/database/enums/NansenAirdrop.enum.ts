import { registerEnumType } from '@nestjs/graphql';

export enum NansenTier {
  GREEN = 'Green',
  ICE = 'Ice',
  NORTH = 'North',
  STAR = 'Star',
}

export enum NansenRewardType {
  MULTIPLIER = 'MULTIPLIER',
  CHEST = 'CHEST',
}

export enum NansenChestType {
  INITIAL = 'INITIAL',
  SILVER_BONUS = 'SILVER_BONUS',
  GOLD_BONUS = 'GOLD_BONUS',
}

export enum NansenChestStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  CLAIMED = 'CLAIMED',
}

registerEnumType(NansenTier, {
  name: 'NansenTier',
});

registerEnumType(NansenRewardType, {
  name: 'NansenRewardType',
});

registerEnumType(NansenChestType, {
  name: 'NansenChestType',
});

registerEnumType(NansenChestStatus, {
  name: 'NansenChestStatus',
});
