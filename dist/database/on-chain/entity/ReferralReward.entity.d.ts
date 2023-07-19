import { BaseEntity } from 'typeorm';
export declare class ReferralReward extends BaseEntity {
    userAddress: string;
    date: Date;
    referrer: string;
    referrerAmount: string;
    referredAmount: string;
}
