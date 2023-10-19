import { BaseEntity } from 'typeorm';
export declare class StakingRewardEntity extends BaseEntity {
    txHash: string;
    logIdx: string;
    pool: string;
    vestingTypeId: string | null;
    token: string;
    amount: string;
    timestamp: Date;
}
