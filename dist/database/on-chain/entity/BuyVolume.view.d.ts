import { BaseEntity } from 'typeorm';
export declare class BuyVolume extends BaseEntity {
    user: string;
    currency: string;
    volume: string;
    date: Date;
}
