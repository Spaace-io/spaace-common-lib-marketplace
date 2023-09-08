import { BaseEntity } from 'typeorm';
export declare class Report extends BaseEntity {
    userAddress: string;
    collectionAddress: string;
    tokenId: string | null;
}
