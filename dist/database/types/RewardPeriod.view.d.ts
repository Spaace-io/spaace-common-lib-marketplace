import { BaseEntity } from 'typeorm';
import { DistributorContract } from '../enums';
export declare class RewardPeriod extends BaseEntity {
    distributor: DistributorContract;
    startTime: Date;
    endTime: Date;
    amount: string;
    distributed: boolean;
}
