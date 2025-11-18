import { BaseEntity } from 'typeorm';
import { AirdropTiersNameOpenseaChapter1 } from '../enums/Airdrops.enum';
export declare class AirdropTierOpenseaChapter1 extends BaseEntity {
    id: number;
    name: AirdropTiersNameOpenseaChapter1;
    totalXp: number;
    totalChestsCount: number;
}
