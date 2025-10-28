import { BaseEntity } from 'typeorm';
export declare class UserConnectionLog extends BaseEntity {
    id: string;
    userAddress: string;
    ipAddress: string;
    fingerprint: string | null;
    actionType: string;
    actionData: Record<string, any> | null;
    timestamp: Date;
    suspicious: boolean;
}
