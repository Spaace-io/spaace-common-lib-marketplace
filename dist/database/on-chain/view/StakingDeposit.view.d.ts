import { BaseEntity } from 'typeorm';
export declare class StakingDeposit extends BaseEntity {
    txHash: string;
    logIdx: string;
    userAddress: string;
    timestamp: Date;
    pool: string;
    amount: string;
}
