import { BaseEntity } from 'typeorm';
import { AirdropTiersName } from '../enums/Airdrops.enum';
export declare class AirdropTier extends BaseEntity {
    id: number;
    name: AirdropTiersName;
    totalXp: number;
    totalChestsCount: number;
}
