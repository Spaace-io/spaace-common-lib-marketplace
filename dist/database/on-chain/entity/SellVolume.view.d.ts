import { BaseEntity } from 'typeorm';
export declare class SellVolume extends BaseEntity {
    user: string;
    currency: string;
    volume: string;
    date: Date;
}
