import { BaseEntity } from 'typeorm';
export declare class TransferEntity extends BaseEntity {
    txHash: string;
    logIdx: string;
    from: string;
    to: string;
    collectionAddress: string;
    tokenId: string;
    amount: string;
    batch: boolean;
    timestamp: Date;
}
