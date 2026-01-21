import { BaseEntity } from 'typeorm';
export declare class AmbassadorEpochLeaderboard extends BaseEntity {
    epochId: string;
    userAddress: string;
    scoreBp: number;
    /**
     * Rank is always computed by backend deterministically.
     * In manual mode: admin sets scoreBp; backend recomputes rank.
     */
    rank: number;
    computedAt: Date;
    referralsCount: number;
    tradingVolume: string;
    referralTradingVolume: string;
    xpSum: string;
    socialScore: number | null;
}
