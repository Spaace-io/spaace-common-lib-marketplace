import { BaseEntity } from 'typeorm';
export declare class ArenaCron extends BaseEntity {
    name: string;
    lastProcessedTime: Date;
}
