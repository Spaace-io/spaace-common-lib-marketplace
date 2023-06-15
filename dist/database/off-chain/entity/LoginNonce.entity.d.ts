export declare const LOGIN_NONCE_VALID_PERIOD: number;
export declare class LoginNonce {
    nonce: string;
    address: string;
    timestamp: Date;
    generateNonce(): void;
}
