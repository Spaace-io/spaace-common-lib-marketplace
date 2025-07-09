import { BaseEntity } from 'typeorm';
import { AirdropTier, AirdropChest } from '../tables';
import { AirdropChestsType, AirdropUsersChestsStatus } from '../enums/Airdrops.enum';
export declare class UserAirdropChest extends BaseEntity {
    address: string;
    tier: AirdropTier;
    chests: AirdropChest[];
}
declare class LoyaltyInfo {
    points: string;
    rank: string;
}
export declare enum ChestRank {
    BRONZE_3 = "BRONZE_3",
    SILVER_1 = "SILVER_1",
    GOLD_3 = "GOLD_3"
}
export declare class AirdropChestByRank {
    id: string;
    name: AirdropChestsType;
    count: number;
    status: AirdropUsersChestsStatus;
}
export declare class ChestsByRank {
    BRONZE_3?: AirdropChestByRank[];
    SILVER_1?: AirdropChestByRank[];
    GOLD_3?: AirdropChestByRank[];
}
export declare class UserAirdropChestLoyalty {
    address: string;
    tier: AirdropTier;
    chestsByRank: ChestsByRank;
    loyalty: LoyaltyInfo;
}
export {};
