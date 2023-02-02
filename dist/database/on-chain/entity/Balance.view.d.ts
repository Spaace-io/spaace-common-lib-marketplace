import { BaseEntity } from 'typeorm';
export declare class Balance extends BaseEntity {
    collection: string;
    tokenId: string;
    user: string;
    balance: string;
}
