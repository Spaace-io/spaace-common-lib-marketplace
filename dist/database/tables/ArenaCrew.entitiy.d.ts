import { BaseEntity } from 'typeorm';
export declare class ArenaCrew extends BaseEntity {
    name: string;
    owner: string | null;
    totalMembers: string;
    totalStarsEarned: string;
}
