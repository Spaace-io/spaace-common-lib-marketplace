import { BaseEntity } from 'typeorm';
import { AirdropTierOpenseaChapter1, AirdropChestOpenseaChapter1 } from '../tables';
import { AirdropChestsTypeOpenseaChapter1, AirdropUsersChestsStatusOpenseaChapter1 } from '../enums/Airdrops.enum';
export declare class UserAirdropChestOpenseaChapter1View extends BaseEntity {
    address: string;
    tier: AirdropTierOpenseaChapter1;
    chests: AirdropChestOpenseaChapter1[];
}
declare class LoyaltyInfoOpenseaChapter1 {
    points: string;
    rank: string;
}
export declare enum ChestRankOpenseaChapter1 {
    BRONZE_3 = "BRONZE_3",
    SILVER_1 = "SILVER_1",
    GOLD_3 = "GOLD_3"
}
export declare class AirdropChestByRankOpenseaChapter1 {
    id: string;
    name: AirdropChestsTypeOpenseaChapter1;
    count: number;
    status: AirdropUsersChestsStatusOpenseaChapter1;
}
export declare class ChestsByRankOpenseaChapter1 {
    BRONZE_3?: AirdropChestByRankOpenseaChapter1[];
    SILVER_1?: AirdropChestByRankOpenseaChapter1[];
    GOLD_3?: AirdropChestByRankOpenseaChapter1[];
}
export declare class UserAirdropChestLoyaltyOpenseaChapter1 {
    address: string;
    tier: AirdropTierOpenseaChapter1;
    chestsByRank: ChestsByRankOpenseaChapter1;
    loyalty: LoyaltyInfoOpenseaChapter1;
}
export {};
