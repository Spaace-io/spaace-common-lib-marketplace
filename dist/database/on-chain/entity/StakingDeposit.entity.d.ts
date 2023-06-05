import { BaseEntity } from 'typeorm';
export declare class StakingDeposit extends BaseEntity {
    user: string;
    timestamp: Date;
    pool: string;
    amount: string;
}
