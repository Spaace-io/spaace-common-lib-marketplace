import { BaseEntity } from 'typeorm';
import { DistributorContract } from '../enums';
export declare class DistributorReward extends BaseEntity {
    userAddress: string;
    distributor: DistributorContract;
    amount: string;
    signature: string;
    timestamp: Date;
    harvestTxHash: string | null;
    harvestLogIdx: string | null;
    harvestTimestamp: Date | null;
}
