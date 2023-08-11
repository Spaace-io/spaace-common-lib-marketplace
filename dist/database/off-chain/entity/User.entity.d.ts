import { BaseEntity } from 'typeorm';
import { UserLoyalty } from '.';
export declare class User extends BaseEntity {
    address: string;
    name: string | null;
    biography: string | null;
    imageUrl: string | null;
    bannerUrl: string | null;
    admin: boolean;
    referralCode: string;
    referrerAddress: string | null;
    timestamp: Date;
    loyalty?: UserLoyalty | null;
    referrer?: User | null;
}
