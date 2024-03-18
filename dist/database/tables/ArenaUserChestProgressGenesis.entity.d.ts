import { BaseEntity } from 'typeorm';
export declare class ArenaUserChestProgressGenesis extends BaseEntity {
    userTwitter: string;
    chestProbability: string;
    totalChestReceived: string;
    lastChestReceivedOnLevel: string;
}
