import { BaseEntity } from 'typeorm';
export declare class TokenPriceEntity extends BaseEntity {
    id: string;
    symbol: string;
    vsCurrency: string;
    price: string;
    bucketedAt: Date;
    fetchedAt: Date;
}
