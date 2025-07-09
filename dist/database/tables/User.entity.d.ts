import { BaseEntity } from 'typeorm';
import { AccessLevel } from '../enums/AccessLevel.enum';
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
    accessLevel: AccessLevel;
    timestamp: Date;
    twitterUsername: string | null;
    twitterId: string | null;
    twitterSecretToken: string | null;
    twitterAccessToken: string | null;
    sharedAirdropOGImage: string | null;
    checkedAirdropS1: boolean;
}
