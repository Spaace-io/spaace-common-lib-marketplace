import { BaseEntity } from 'typeorm';
export declare class LastRefresh extends BaseEntity {
    pk: boolean;
    timestamp: Date;
}
