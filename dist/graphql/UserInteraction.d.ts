export declare enum UserInteractionType {
    DAILY_CLAIM = "DAILY_CLAIM",
    BUY_NOW = "BUY_NOW",
    SELL_INSTANTLY = "SELL_INSTANTLY",
    SWEEP_FLOOR = "SWEEP_FLOOR"
}
export declare class UserInteraction {
    type: UserInteractionType;
    userAddress: string;
}
