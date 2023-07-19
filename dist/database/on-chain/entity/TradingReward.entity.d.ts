import { BaseEntity } from 'typeorm';
export declare class TradingReward extends BaseEntity {
    userAddress: string;
    date: Date;
    buyAmount: string;
    sellAmount: string;
}
