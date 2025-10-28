import { BaseEntity } from 'typeorm';
export declare class IpIntelligence extends BaseEntity {
    ipAddress: string;
    totalUsers: number;
    activeUsers: number;
    bannedUsers: number;
    ipType: string | null;
    countryCode: string | null;
    riskScore: number;
    isBlacklisted: boolean;
}
