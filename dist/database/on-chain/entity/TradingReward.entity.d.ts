import { BaseEntity } from 'typeorm';
export declare class TradingReward extends BaseEntity {
    user: string;
    date: Date;
    buyAmount: string;
    sellAmount: string;
}
