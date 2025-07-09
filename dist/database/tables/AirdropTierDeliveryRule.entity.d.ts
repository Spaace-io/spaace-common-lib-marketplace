import { BaseEntity } from 'typeorm';
export declare class AirdropTierDeliveryRule extends BaseEntity {
    id: number;
    tierId: number;
    chestId: number;
    count: number;
}
