import { BaseEntity } from 'typeorm';
export declare class ArenaCrewStarTracking extends BaseEntity {
    id: string;
    crewName: string;
    stars: string;
    timestamp: Date;
}
