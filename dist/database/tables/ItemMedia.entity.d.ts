import { BaseEntity } from 'typeorm';
export declare class ItemMediaEntity extends BaseEntity {
    id: string;
    collectionAddress: string;
    tokenId: string;
    primary: boolean;
    raw: string;
}
