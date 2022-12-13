import { BaseEntity } from 'typeorm';
export declare class Block extends BaseEntity {
    number: number;
    hash: string;
    timestamp: Date;
}
