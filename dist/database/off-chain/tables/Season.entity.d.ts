import { BaseEntity } from 'typeorm';
export declare class Season extends BaseEntity {
    number: string;
    startTime: Date;
    endTime: Date | null;
}
