import { BaseEntity } from 'typeorm';
export declare class UserLoyalty extends BaseEntity {
    userAddress: string;
    seasonNumber: string;
    points: string;
    questCompleted: string;
}
