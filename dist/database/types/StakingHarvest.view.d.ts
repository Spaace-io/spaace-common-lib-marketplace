import { BaseEntity } from 'typeorm';
export declare class StakingHarvest extends BaseEntity {
    txHash: string;
    logIdx: string;
    userAddress: string;
    pool: string;
    depositId: string;
    token: string;
    amount: string;
    timestamp: Date;
}
