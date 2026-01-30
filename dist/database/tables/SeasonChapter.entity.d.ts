import { BaseEntity } from 'typeorm';
export declare enum SeasonChapterKey {
    PRE_RESET = "PRE_RESET",
    FINAL_CHAPTER = "FINAL_CHAPTER",
    POST_FINAL_CHAPTER = "POST_FINAL_CHAPTER",
    MANUAL_RESET = "MANUAL_RESET"
}
export declare class SeasonChapter extends BaseEntity {
    id: number;
    seasonNumber: string;
    name: string;
    key: SeasonChapterKey;
    startAt: Date;
    createdAt: Date;
    preserveDiscordFloor: boolean;
    preserveReferralFloor: boolean;
}
