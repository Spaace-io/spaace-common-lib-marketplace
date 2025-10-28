import { BaseEntity } from 'typeorm';
export declare class DeviceFingerprint extends BaseEntity {
    fingerprintHash: string;
    totalUsers: number;
    activeUsers: number;
    bannedUsers: number;
    firstSeen: Date;
    lastSeen: Date;
    riskScore: number;
    suspicious: boolean;
}
