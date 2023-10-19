import { BaseEntity } from 'typeorm';
import { StakingType } from '../tables';
export declare class StakingDeposit extends BaseEntity {
    txHash: string;
    logIdx: string;
    type: StakingType;
    pool: string;
    userAddress: string;
    depositId: string | null;
    lockTypeId: string | null;
    vestingTypeId: string | null;
    shares: string;
    tokens: string;
    timestamp: Date;
}
export declare class ActiveStakingDeposit extends BaseEntity {
    txHash: string;
    logIdx: string;
    type: StakingType;
    pool: string;
    userAddress: string;
    depositId: string;
    lockTypeId: string | null;
    shares: string;
    tokens: string;
    timestamp: Date;
}
export declare class PassiveStakingDeposit extends BaseEntity {
    txHash: string;
    logIdx: string;
    type: StakingType;
    pool: string;
    userAddress: string;
    vestingTypeId: string;
    shares: string;
    tokens: string;
    timestamp: Date;
}
