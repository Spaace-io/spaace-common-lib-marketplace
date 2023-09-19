import { BaseEntity } from 'typeorm';
export declare class TokenBalance extends BaseEntity {
    currency: string;
    userAddress: string;
    balance: string;
}
