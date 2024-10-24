import { BaseEntity } from 'typeorm';
import { DistributorContract } from '../enums';
export declare class RewardPeriodEntity extends BaseEntity {
    distributor: DistributorContract;
    startTime: Date;
    endTime: Date;
    amount: string;
    distributed: boolean;
}
