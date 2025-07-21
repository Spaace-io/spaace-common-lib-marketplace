import { BaseEntity } from 'typeorm';
import { AirdropUsersChestsStatus } from '../enums/Airdrops.enum';
import { LoyaltyRank } from './SeasonRank.entity';
export declare class AirdropUserChest extends BaseEntity {
    id: number;
    address: string;
    chestId: number;
    status: AirdropUsersChestsStatus;
    rank: LoyaltyRank;
}
