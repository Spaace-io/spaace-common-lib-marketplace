import { BaseEntity } from 'typeorm';
export declare class BuyVolume extends BaseEntity {
    userAddress: string;
    currency: string;
    volume: string;
    date: Date;
}
