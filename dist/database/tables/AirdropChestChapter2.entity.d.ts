import { BaseEntity } from 'typeorm';
import { AirdropChestsTypeChapter2 } from '../enums/Airdrops.enum';
export declare class AirdropChestChapter2 extends BaseEntity {
    id: number;
    name: AirdropChestsTypeChapter2;
    valueXp: number;
}
