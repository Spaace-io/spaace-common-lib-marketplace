import { BaseEntity } from 'typeorm';
export declare class ReferralReward extends BaseEntity {
    user: string;
    date: Date;
    referrer: string;
    referrerAmount: string;
    referredAmount: string;
}
