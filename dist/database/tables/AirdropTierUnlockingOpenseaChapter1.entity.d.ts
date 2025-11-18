import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from './SeasonRank.entity';
export declare class AirdropTierUnlockingOpenseaChapter1 extends BaseEntity {
    id: number;
    tierId: number;
    rank: LoyaltyRank;
    chestId: number;
    chestCount: number;
}
