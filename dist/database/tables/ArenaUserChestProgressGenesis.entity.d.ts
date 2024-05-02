import { BaseEntity } from 'typeorm';
export declare class ArenaUserChestProgressGenesis extends BaseEntity {
    levelId: string;
    userTwitterId: string;
    totalChestReceived: string;
    lastChestReceivedOnLevel: string;
}
