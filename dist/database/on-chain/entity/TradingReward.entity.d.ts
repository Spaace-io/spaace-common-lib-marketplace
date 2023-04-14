import { BaseEntity } from 'typeorm';
export declare class TradingReward extends BaseEntity {
    user: string;
    buyAmount: string;
    sellAmount: string;
    date: Date;
}
