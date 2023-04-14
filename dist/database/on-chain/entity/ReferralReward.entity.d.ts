import { BaseEntity } from 'typeorm';
export declare class ReferralReward extends BaseEntity {
    user: string;
    referrerAmount: string;
    referredAmount: string;
    date: Date;
}
