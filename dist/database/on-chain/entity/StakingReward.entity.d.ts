import { BaseEntity } from 'typeorm';
export declare class StakingRewardEntity extends BaseEntity {
    txHash: string;
    logIdx: string;
    userAddress: string;
    timestamp: Date;
    pool: string;
    token: string;
    amount: string;
}
