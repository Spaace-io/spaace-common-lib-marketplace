import { BaseEntity } from 'typeorm';
import { StakingPool } from './StakingDeposit.entity';
export declare class StakingRewardEntity extends BaseEntity {
    txHash: string;
    logIdx: string;
    userAddress: string;
    pool: StakingPool;
    depositId: string;
    token: string;
    amount: string;
    timestamp: Date;
}
