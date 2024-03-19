import { BaseEntity } from 'typeorm';
export declare class ArenaUserChestProgressGenesis extends BaseEntity {
    levelId: string;
    userTwitter: string;
    chestProbability: string;
    totalChestReceived: string;
    lastChestReceivedOnLevel: string;
}
