import { BaseEntity } from 'typeorm';
import { Quest, SeasonRank } from '.';
export declare class Season extends BaseEntity {
    number: number;
    startDate: Date;
    endDate: Date | null;
    quests?: Quest[];
    ranks?: SeasonRank[];
}
