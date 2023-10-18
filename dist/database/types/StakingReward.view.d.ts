import { BaseEntity } from 'typeorm';
import { StakingPool } from '../tables';
export declare class StakingReward extends BaseEntity {
    txHash: string;
    logIdx: string;
    userAddress: string;
    pool: StakingPool;
    depositId: string;
    token: string;
    amount: string;
    timestamp: Date;
}
