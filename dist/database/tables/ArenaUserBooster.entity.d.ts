import { BaseEntity } from 'typeorm';
export declare class ArenaUserBooster extends BaseEntity {
    id: string;
    userTwitterId: string;
    seasonNumber: string;
    booster: number;
    expiresOn: Date;
}
