import { BaseEntity } from 'typeorm';
export declare const LOGIN_NONCE_VALID_PERIOD: number;
export declare class LoginNonce extends BaseEntity {
    nonce: string;
    address: string;
    timestamp: Date;
    generateNonce(): void;
}
