import { BaseEntity } from 'typeorm';
import { Quest } from './Quest.entity';
export declare class SpotlightHistoryEntry {
    collectionAddress: string;
    seasonNumber: string;
    validFrom: string;
    validTo: string;
    deactivatedManually?: boolean | null;
    deactivatedAt?: string | null;
    note?: string | null;
}
export declare class SpotlightCampaign extends BaseEntity {
    id: string;
    collectionAddress: string;
    collectionName: string;
    seasonNumber: string;
    questId: string;
    quest: Quest;
    validFrom: Date;
    validTo: Date;
    active: boolean;
    metadata: SpotlightHistoryEntry[];
}
