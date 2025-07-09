import { BaseEntity } from 'typeorm';
export declare class AirdropUser extends BaseEntity {
    id: number;
    address: string;
    tierId: number;
    tierUpgraded: boolean;
}
