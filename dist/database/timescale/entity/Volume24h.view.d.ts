import { BaseEntity } from 'typeorm';
export declare class Volume24h extends BaseEntity {
    collection: string;
    currency: string;
    bucket: Date;
    volume: string;
}
