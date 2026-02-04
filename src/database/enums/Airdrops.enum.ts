import { registerEnumType } from '@nestjs/graphql';

export enum AirdropChestsType {
  MYTHIC = 'Mythic',
  LEGENDARY = 'Legendary',
  EPIC = 'Epic',
  RARE = 'Rare',
  COMMON = 'Common',
}

export enum AirdropChestsTypeChapter1 {
  MYTHIC = 'Mythic',
  LEGENDARY = 'Legendary',
  EPIC = 'Epic',
  RARE = 'Rare',
  COMMON = 'Common',
}

export enum AirdropChestsTypeOpenseaChapter1 {
  MYTHIC = 'Mythic',
  LEGENDARY = 'Legendary',
  EPIC = 'Epic',
  RARE = 'Rare',
  COMMON = 'Common',
}

export enum AirdropChestsTypeChapter2 {
  QUANTUM = 'Quantum',
  MYTHIC = 'Mythic',
  LEGENDARY = 'Legendary',
  EPIC = 'Epic',
  RARE = 'Rare',
}

registerEnumType(AirdropChestsType, {
  name: 'AirdropChestsType',
});

registerEnumType(AirdropChestsTypeChapter1, {
  name: 'AirdropChestsTypeChapter1',
});

registerEnumType(AirdropChestsTypeOpenseaChapter1, {
  name: 'AirdropChestsTypeOpenseaChapter1',
});

registerEnumType(AirdropChestsTypeChapter2, {
  name: 'AirdropChestsTypeChapter2',
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

export enum AirdropTiersNameChapter1 {
  D5 = 'D5',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
  P5 = 'P5',
  G1 = 'G1',
  G2 = 'G2',
  G3 = 'G3',
  G4 = 'G4',
  G5 = 'G5',
  S1 = 'S1',
  S2 = 'S2',
  S3 = 'S3',
  S4 = 'S4',
  S5 = 'S5',
  B1 = 'B1',
  B2 = 'B2',
  B3 = 'B3',
  B4 = 'B4',
}

export enum AirdropTiersNameOpenseaChapter1 {
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

export enum AirdropTiersNameChapter2 {
  D2 = 'D2',
  D3 = 'D3',
  D4 = 'D4',
  D5 = 'D5',
  P1 = 'P1',
  P2 = 'P2',
  P3 = 'P3',
  P4 = 'P4',
  P5 = 'P5',
  G1 = 'G1',
  G2 = 'G2',
  G3 = 'G3',
  G4 = 'G4',
  G5 = 'G5',
  S1 = 'S1',
  S2 = 'S2',
  S3 = 'S3',
  S4 = 'S4',
  S5 = 'S5',
  B1 = 'B1',
  B2 = 'B2',
  B3 = 'B3',
  B4 = 'B4',
}

registerEnumType(AirdropTiersName, {
  name: 'AirdropTiersName',
});

registerEnumType(AirdropTiersNameChapter1, {
  name: 'AirdropTiersNameChapter1',
});

registerEnumType(AirdropTiersNameOpenseaChapter1, {
  name: 'AirdropTiersNameOpenseaChapter1',
});

registerEnumType(AirdropTiersNameChapter2, {
  name: 'AirdropTiersNameChapter2',
});

export enum AirdropUsersChestsStatus {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  CLAIMABLE = 'CLAIMABLE',
}

export enum AirdropUsersChestsStatusChapter1 {
  UNLOCKED = 'UNLOCKED',
  CLAIMABLE = 'CLAIMABLE',
}

export enum AirdropUsersChestsStatusOpenseaChapter1 {
  LOCKED = 'LOCKED',
  UNLOCKED = 'UNLOCKED',
  CLAIMABLE = 'CLAIMABLE',
}

export enum AirdropUsersChestsStatusChapter2 {
  UNLOCKED = 'UNLOCKED',
  CLAIMABLE = 'CLAIMABLE',
}

registerEnumType(AirdropUsersChestsStatus, {
  name: 'AirdropUsersChestsStatus',
});

registerEnumType(AirdropUsersChestsStatusChapter1, {
  name: 'AirdropUsersChestsStatusChapter1',
});

registerEnumType(AirdropUsersChestsStatusOpenseaChapter1, {
  name: 'AirdropUsersChestsStatusOpenseaChapter1',
});

registerEnumType(AirdropUsersChestsStatusChapter2, {
  name: 'AirdropUsersChestsStatusChapter2',
});
