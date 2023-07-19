import { BaseEntity } from 'typeorm';
export declare class SellVolume extends BaseEntity {
    userAddress: string;
    currency: string;
    volume: string;
    date: Date;
}
