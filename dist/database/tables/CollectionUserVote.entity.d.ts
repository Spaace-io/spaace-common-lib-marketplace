import { BaseEntity } from 'typeorm';
export declare class CollectionUserVoteEntity extends BaseEntity {
    collectionAddress: string;
    userAddress: string;
    voteType: number;
    timestamp: Date;
}
