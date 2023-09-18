import { BaseEntity } from 'typeorm';
export declare class TokenTransferEntity extends BaseEntity {
    txHash: string;
    logIdx: string;
    from: string;
    to: string;
    currency: string;
    amount: string;
    timestamp: Date;
}
