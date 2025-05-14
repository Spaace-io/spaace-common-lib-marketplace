import { BaseEntity } from 'typeorm';
export declare class XpMultiplierMetadata {
    key: string;
    value: string;
}
export declare class XpMultiplier extends BaseEntity {
    id: number;
    userAddress: string;
    seasonNumber: string;
    multiplier: number;
    metadata: XpMultiplierMetadata[];
    expiresAt: Date | null;
    createdAt: Date;
}
