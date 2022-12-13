import { BaseEntity } from 'typeorm';
export declare class Transfer extends BaseEntity {
    hash: string;
    from: string;
    to: string;
    collection: string;
    item: string;
    amount: string;
    timestamp: Date;
}
