import { BaseEntity } from 'typeorm';
import { AirdropUsersChestsStatusChapter1 } from '../enums/Airdrops.enum';
export declare class AirdropUserChestChapter1 extends BaseEntity {
    id: number;
    address: string;
    chestId: number;
    status: AirdropUsersChestsStatusChapter1;
}
