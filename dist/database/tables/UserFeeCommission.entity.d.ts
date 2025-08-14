import { BaseEntity } from 'typeorm';
export declare class UserFeeCommission extends BaseEntity {
    id: string;
    address: string;
    referrerAddress: string;
    day: string;
    accumulated: string;
    timestamp: Date;
}
