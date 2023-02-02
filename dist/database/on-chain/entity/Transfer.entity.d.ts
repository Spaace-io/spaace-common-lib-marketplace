import { BaseEntity } from 'typeorm';
export declare class Transfer extends BaseEntity {
    txHash: string;
    logIdx: number;
    from: string;
    to: string;
    collection: string;
    tokenId: string;
    amount: string;
    timestamp: Date;
}
