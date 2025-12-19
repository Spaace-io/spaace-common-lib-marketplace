import { BaseEntity } from 'typeorm';
import { DiscordTierEnum } from '../enums/DiscordTierEnum.enum';
export declare class UserDiscordRankSync extends BaseEntity {
    userAddress: string;
    seasonNumber: string;
    discordId: string;
    lastSyncedTier: DiscordTierEnum | null;
    lastSyncedAt: Date | null;
    updatedAt: Date;
}
