import { BaseEntity } from 'typeorm';
export declare enum StakingPool {
    STANDARD_STAKING = "STANDARD_STAKING",
    COMPOUND_STAKING = "COMPOUND_STAKING"
}
export declare class StakingDepositEntity extends BaseEntity {
    txHash: string;
    logIdx: string;
    userAddress: string;
    pool: StakingPool;
    depositId: string;
    lockTypeId: string | null;
    shares: string;
    tokens: string;
    timestamp: Date;
}
