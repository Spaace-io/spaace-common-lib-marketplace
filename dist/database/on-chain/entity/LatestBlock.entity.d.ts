import { BaseEntity } from 'typeorm';
export declare class LatestBlockEntity extends BaseEntity {
    pk: boolean;
    number: number;
    hash: string;
    timestamp: Date;
}
