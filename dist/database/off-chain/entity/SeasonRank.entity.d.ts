import { QuestReward } from '.';
export declare enum Rank {
    BRONZE_5 = "bronze5",
    BRONZE_4 = "bronze4",
    BRONZE_3 = "bronze3",
    BRONZE_2 = "bronze2",
    BRONZE_1 = "bronze1",
    SILVER_5 = "silver5",
    SILVER_4 = "silver4",
    SILVER_3 = "silver3",
    SILVER_2 = "silver2",
    SILVER_1 = "silver1",
    GOLD_5 = "gold5",
    GOLD_4 = "gold4",
    GOLD_3 = "gold3",
    GOLD_2 = "gold2",
    GOLD_1 = "gold1",
    PLATINUM_5 = "platinum5",
    PLATINUM_4 = "platinum4",
    PLATINUM_3 = "platinum3",
    PLATINUM_2 = "platinum2",
    PLATINUM_1 = "platinum1",
    DIAMOND_5 = "diamond5",
    DIAMOND_4 = "diamond4",
    DIAMOND_3 = "diamond3",
    DIAMOND_2 = "diamond2",
    DIAMOND_1 = "diamond1"
}
export declare class SeasonRank {
    seasonNumber: number;
    rank: Rank;
    threshold: string;
    rewards: (typeof QuestReward)[];
}
