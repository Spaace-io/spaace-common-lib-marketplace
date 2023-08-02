import { BaseEntity } from 'typeorm';
import { Quest, SeasonRank } from '.';
export declare class Season extends BaseEntity {
    number: string;
    startTime: Date;
    endTime: Date | null;
    quests?: Quest[];
    ranks?: SeasonRank[];
}
