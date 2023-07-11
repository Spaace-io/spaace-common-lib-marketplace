import { Quest, SeasonRank } from '.';
export declare class Season {
    number: number;
    startDate: Date;
    endDate: Date | null;
    quests: Quest[];
    ranks: SeasonRank[];
}
