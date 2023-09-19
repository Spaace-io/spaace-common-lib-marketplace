import { BaseEntity } from 'typeorm';
export declare class TokenTransfer extends BaseEntity {
    txHash: string;
    logIdx: string;
    from: string;
    to: string;
    currency: string;
    amount: string;
    timestamp: Date;
}
