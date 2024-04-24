import { BaseEntity } from 'typeorm';
export declare class ArenaAdmin extends BaseEntity {
    twitterUsername: string;
    twitterId: string;
    twitterPicture: string;
    accountCreationDate: Date;
    twitterSecretToken: string;
    twitterAccessToken: string;
    walletAddress: string | undefined;
    tweetLikePaginationToken: string | null;
}
