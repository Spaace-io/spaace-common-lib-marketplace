import { BaseEntity } from 'typeorm';
export declare class ArenaSeason extends BaseEntity {
    number: string;
    startTime: Date;
    endTime: Date | null;
    rewardCoefiecient: string;
}
