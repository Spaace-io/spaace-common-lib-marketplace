import { BaseEntity } from 'typeorm';
export declare class ArenaUserBooster extends BaseEntity {
    userTwitter: string;
    seasonNumber: string;
    booster: number;
    expiresOn: Date;
}
