import { BaseEntity } from 'typeorm';
export declare class ArenaUserEarnedChest extends BaseEntity {
    id: string;
    userTwitter: string;
    seasonNumber: string;
    xp: string;
    chestName: string;
    isClaimed: boolean;
}
