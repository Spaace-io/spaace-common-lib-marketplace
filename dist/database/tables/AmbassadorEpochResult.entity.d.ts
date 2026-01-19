import { BaseEntity } from 'typeorm';
export declare class AmbassadorEpochResult extends BaseEntity {
    epochId: string;
    userAddress: string;
    rank: number;
    scoreBp: number;
    archivedAt: Date;
}
