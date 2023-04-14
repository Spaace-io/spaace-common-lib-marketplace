import { BaseEntity } from 'typeorm';
export declare class StakingDeposit extends BaseEntity {
    user: string;
    pool: string;
    amount: string;
    date: Date;
}
