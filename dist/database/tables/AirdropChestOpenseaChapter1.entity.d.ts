import { BaseEntity } from 'typeorm';
import { AirdropChestsTypeOpenseaChapter1 } from '../enums/Airdrops.enum';
export declare class AirdropChestOpenseaChapter1 extends BaseEntity {
    id: number;
    name: AirdropChestsTypeOpenseaChapter1;
    valueXp: number;
}
