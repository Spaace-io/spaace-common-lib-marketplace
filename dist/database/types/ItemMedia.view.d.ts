import { BaseEntity } from 'typeorm';
export declare class ItemMedia extends BaseEntity {
    id: string;
    collectionAddress: string;
    tokenId: string;
    primary: boolean;
    raw: string;
}
