import { BaseEntity } from 'typeorm';
export declare class StakingReward extends BaseEntity {
    txHash: string;
    logIdx: string;
    pool: string;
    vestingTypeId: string;
    token: string;
    amount: string;
    timestamp: Date;
}
