import { BaseEntity } from 'typeorm';
export declare enum StakingType {
    PASSIVE = "PASSIVE",
    ACTIVE = "ACTIVE"
}
export declare class StakingDepositEntity extends BaseEntity {
    txHash: string;
    logIdx: string;
    type: StakingType;
    pool: string;
    userAddress: string;
    shares: string;
    tokens: string;
    timestamp: Date;
}
export declare class ActiveStakingDepositEntity extends StakingDepositEntity {
    depositId: string;
    lockTypeId: string | null;
}
export declare class PassiveStakingDepositEntity extends StakingDepositEntity {
    vestingTypeId: string;
}
