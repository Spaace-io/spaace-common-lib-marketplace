import { BaseEntity } from 'typeorm';
export declare class TokenBalanceEntity extends BaseEntity {
    currency: string;
    userAddress: string;
    balance: string;
}
