import { BaseEntity } from 'typeorm';
import { AirdropChestsType } from '../enums/Airdrops.enum';
export declare class AirdropChest extends BaseEntity {
    id: number;
    name: AirdropChestsType;
    valueXp: number;
}
