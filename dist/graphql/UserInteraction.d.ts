export declare enum UserInteractionType {
    DAILY_CLAIM = 0,
    BUY_NOW = 1,
    SELL_INSTANTLY = 2,
    SWEEP_FLOOR = 3
}
export declare class UserInteraction {
    type: UserInteractionType;
    userAddress: string;
}
