import { BaseEntity } from 'typeorm';
export declare class LatestBlock extends BaseEntity {
    pk: boolean;
    number: number;
    hash: string;
    timestamp: Date;
}
