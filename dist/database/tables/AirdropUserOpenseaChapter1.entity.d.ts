import { BaseEntity } from 'typeorm';
export declare class AirdropUserOpenseaChapter1 extends BaseEntity {
    id: number;
    address: string;
    tierId: number;
    tierUpgraded: boolean;
    unlockedLevel1: boolean;
    unlockedLevel2: boolean;
    unlockedLevel3: boolean;
}
