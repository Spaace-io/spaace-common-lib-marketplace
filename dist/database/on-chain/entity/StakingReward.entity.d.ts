import { BaseEntity } from 'typeorm';
export declare class StakingReward extends BaseEntity {
    txHash: string;
    logIdx: string;
    userAddress: string;
    timestamp: Date;
    pool: string;
    token: string;
    amount: string;
}
