export declare enum RuleProperty {
    LISTED = "listed",
    LISTED_TOTAL_VALUE = "listedTotalValue",
    SOLD = "sold",
    SOLD_TOTAL_VALUE = "soldTotalValue"
}
export declare enum RuleOperator {
    EQL = "eq",
    GT = "gt",
    GTE = "gte",
    LT = "lt",
    LTE = "lte",
    NEQ = "neq"
}
export type Rule = {
    property?: RuleProperty;
    operator?: RuleOperator;
    value?: number;
};
