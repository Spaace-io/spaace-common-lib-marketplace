import { BaseEntity } from 'typeorm';
export declare class StakingDeposit extends BaseEntity {
    userAddress: string;
    timestamp: Date;
    pool: string;
    amount: string;
}
