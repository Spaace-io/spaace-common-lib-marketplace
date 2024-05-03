import { BaseEntity } from 'typeorm';
export declare class ArenaUserBooster extends BaseEntity {
    id: string;
    userTwitterId: string;
    seasonNumber: string;
    expiresOn: Date;
    booster: number;
}
