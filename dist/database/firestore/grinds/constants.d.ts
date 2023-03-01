import { RuleEventProperty, RuleOperator } from '../types';
export declare const MIN_SALE_PRICE: {
    property: RuleEventProperty;
    operator: RuleOperator;
    value: string;
};
export declare const TOP_50_VOLUME: {
    property: RuleEventProperty;
    operator: RuleOperator;
    value: string;
};
export declare const activityTime: (hours: string) => {
    property: RuleEventProperty;
    operator: RuleOperator;
    value: string;
};
