import { BaseEntity } from 'typeorm';
import { TournamentStatus } from '../enums/TournamentStatus.enum';
import { TournamentRewardType } from '../enums/TournamentRewardType.enum';
import { UserXpLog } from './UserXpLog.entity';
import { User } from './User.entity';
export declare class BonusTierType {
    threshold: number;
    multiplier: number;
}
export declare class TournamentsEntity extends BaseEntity {
    id: string;
    name: string;
    description: string;
    status: TournamentStatus;
    startAt: Date;
    endAt: Date;
    totalPrizeAmount: string;
    rewardType: TournamentRewardType;
    rewardedParticipantsVolumeWei?: string | null;
    bonusTiers: BonusTierType[];
    createdAt: Date;
    updatedAt: Date;
    rewardBrackets: TournamentRewardBracket[];
    results: TournamentResult[];
    participants: TournamentParticipant[];
    userXpLogs: UserXpLog[];
}
export declare class TournamentRewardBracket extends BaseEntity {
    id: string;
    tournamentId: string;
    placeFrom: number;
    placeTo: number;
    rewardAmount?: string | null;
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
    user: User;
    finalPlace: number;
    rewardAmount: string;
    baseRewardAmount?: string | null;
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
    user: User;
    score: string;
    place: number;
    countPurchases: number;
    createdAt: Date;
    updatedAt: Date;
}
