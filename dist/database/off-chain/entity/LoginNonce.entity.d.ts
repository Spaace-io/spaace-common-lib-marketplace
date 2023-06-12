import { User } from './User.entity';
export declare const LOGIN_NONCE_VALID_PERIOD: number;
export declare class LoginNonce {
    nonce: string;
    user: User;
    timestamp: Date;
    generateUuid(): void;
}