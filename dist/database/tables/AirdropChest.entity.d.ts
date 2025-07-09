import { BaseEntity } from 'typeorm';
import { AirdropChestsType, AirdropUsersChestsStatus } from '../enums/Airdrops.enum';
export declare class AirdropChest extends BaseEntity {
    id: number;
    name: AirdropChestsType;
    valueXp: number;
    status: AirdropUsersChestsStatus;
}
