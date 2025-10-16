import { BaseEntity } from 'typeorm';
import { LoyaltyRank } from './SeasonRank.entity';
export declare class AirdropUserChapter1 extends BaseEntity {
    id: number;
    address: string;
    tierId: number;
    rank: LoyaltyRank;
    points: number;
}
