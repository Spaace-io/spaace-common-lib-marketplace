import { BaseEntity } from 'typeorm';
export declare class ArenaCrew extends BaseEntity {
    name: string;
    owner: string | null;
    description: string;
    discord: string;
    link: string;
    password: string;
    banner: string;
    profile: string;
    totalMembers: string;
    totalStarsEarned: string;
    creationDate: Date;
}
