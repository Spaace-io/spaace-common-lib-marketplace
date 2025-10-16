import { BaseEntity } from 'typeorm';
import { AirdropTiersNameChapter1 } from '../enums/Airdrops.enum';
export declare class AirdropTierChapter1 extends BaseEntity {
    id: number;
    name: AirdropTiersNameChapter1;
    totalXp: number;
    totalChestsCount: number;
}
