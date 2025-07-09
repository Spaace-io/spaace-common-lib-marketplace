import { registerEnumType } from '@nestjs/graphql';

export enum AirdropChestsType {
  MYTHIC = 'Mythic',
  LEGENDARY = 'Legendary',
  RARE = 'Rare',
  UNCOMMON = 'Uncommon',
  COMMON = 'Common',
}

registerEnumType(AirdropChestsType, {
  name: 'AirdropChestsType',
});

export enum AirdropTiersName {
  TIER_1 = 'TIER_1',
  TIER_2 = 'TIER_2',
  TIER_3 = 'TIER_3',
  TIER_4 = 'TIER_4',
  TIER_5 = 'TIER_5',
  TIER_6 = 'TIER_6',
  TIER_7 = 'TIER_7',
  TIER_8 = 'TIER_8',
  TIER_9 = 'TIER_9',
  TIER_10 = 'TIER_10',
  TIER_11 = 'TIER_11',
  TIER_12 = 'TIER_12',
  TIER_13 = 'TIER_13',
  TIER_14 = 'TIER_14',
  TIER_15 = 'TIER_15',
}

registerEnumType(AirdropTiersName, {
  name: 'AirdropTiersName',
});

export enum AirdropUsersChestsStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  CLAIMABLE = 'CLAIMABLE',
}

registerEnumType(AirdropUsersChestsStatus, {
  name: 'AirdropUsersChestsStatus',
});
