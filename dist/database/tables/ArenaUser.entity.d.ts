import { BaseEntity } from 'typeorm';
export declare class ArenaUser extends BaseEntity {
    twitterUsername: string;
    name: string | null;
    imageUrl: string | null;
    referralCode: string;
    referrerUsername: string | null;
    timestamp: Date;
}
