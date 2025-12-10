import { BaseEntity } from 'typeorm';
import { TournamentStatus } from '../enums/TournamentStatus.enum';
export declare class TournamentsEntity extends BaseEntity {
    id: string;
    name: string;
    description: string;
    status: TournamentStatus;
    startAt: Date;
    endAt: Date;
    totalPrizeXp: string;
    createdAt: Date;
    updatedAt: Date;
    rewardBrackets: TournamentRewardBracket[];
    results: TournamentResult[];
    participants: TournamentParticipant[];
}
export declare class TournamentRewardBracket extends BaseEntity {
    id: string;
    tournamentId: string;
    placeFrom: number;
    placeTo: number;
    rewardXp: string;
    score: string;
    createdAt: Date;
    updatedAt: Date;
    tournament: TournamentsEntity;
}
export declare class TournamentResult extends BaseEntity {
    id: string;
    tournamentId: string;
    tournament: TournamentsEntity;
    address: string;
    finalPlace: number;
    rewardXp: string;
    score: string;
    countPurchases: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class TournamentParticipant extends BaseEntity {
    id: string;
    tournamentId: string;
    tournament: TournamentsEntity;
    address: string;
    score: string;
    place: number | null;
    countPurchases: number;
    createdAt: Date;
    updatedAt: Date;
}
