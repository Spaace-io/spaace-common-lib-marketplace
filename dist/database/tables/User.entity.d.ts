import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    address: string;
    name: string | null;
    email: string | null;
    biography: string | null;
    imageUrl: string | null;
    bannerUrl: string | null;
    admin: boolean;
    referralCode: string;
    referrerAddress: string | null;
    timestamp: Date;
}
