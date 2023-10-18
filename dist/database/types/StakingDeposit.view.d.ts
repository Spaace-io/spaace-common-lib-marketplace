import { BaseEntity } from 'typeorm';
import { StakingPool } from '../tables';
export declare class StakingDeposit extends BaseEntity {
    txHash: string;
    logIdx: string;
    userAddress: string;
    pool: StakingPool;
    depositId: string;
    lockTypeId: string;
    shares: string;
    timestamp: Date;
}
