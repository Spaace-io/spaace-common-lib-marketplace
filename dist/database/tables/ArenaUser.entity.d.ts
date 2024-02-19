import { BaseEntity } from 'typeorm';
export declare class ArenaUser extends BaseEntity {
    twitterUsername: string;
    name: string | null;
    imageUrl: string | null;
    referrerUsername: string | null;
    timestamp: Date;
}
