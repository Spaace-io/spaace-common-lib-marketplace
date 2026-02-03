import { BaseEntity } from 'typeorm';
import { AirdropUsersChestsStatusChapter2 } from '../enums/Airdrops.enum';
export declare class AirdropUserChestChapter2 extends BaseEntity {
    id: number;
    address: string;
    chestId: number;
    status: AirdropUsersChestsStatusChapter2;
}
