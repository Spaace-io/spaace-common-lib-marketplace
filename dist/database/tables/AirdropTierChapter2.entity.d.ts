import { BaseEntity } from 'typeorm';
import { AirdropTiersNameChapter2 } from '../enums/Airdrops.enum';
export declare class AirdropTierChapter2 extends BaseEntity {
    id: number;
    name: AirdropTiersNameChapter2;
    totalXp: number;
    totalChestsCount: number;
}
