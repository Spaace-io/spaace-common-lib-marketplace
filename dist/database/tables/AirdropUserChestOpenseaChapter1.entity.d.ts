import { BaseEntity } from 'typeorm';
import { AirdropUsersChestsStatusOpenseaChapter1 } from '../enums/Airdrops.enum';
export declare class AirdropUserChestOpenseaChapter1 extends BaseEntity {
    id: number;
    address: string;
    chestId: number;
    status: AirdropUsersChestsStatusOpenseaChapter1;
}
