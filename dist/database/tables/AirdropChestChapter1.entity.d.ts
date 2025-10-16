import { BaseEntity } from 'typeorm';
import { AirdropChestsTypeChapter1 } from '../enums/Airdrops.enum';
export declare class AirdropChestChapter1 extends BaseEntity {
    id: number;
    name: AirdropChestsTypeChapter1;
    valueXp: number;
}
