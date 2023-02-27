"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuleOperator = exports.RuleProperty = void 0;
var RuleProperty;
(function (RuleProperty) {
    RuleProperty["LISTED"] = "listed";
    RuleProperty["LISTED_TOTAL_VALUE"] = "listedTotalValue";
    RuleProperty["SOLD"] = "sold";
    RuleProperty["SOLD_TOTAL_VALUE"] = "soldTotalValue";
})(RuleProperty = exports.RuleProperty || (exports.RuleProperty = {}));
var RuleOperator;
(function (RuleOperator) {
    RuleOperator["EQL"] = "eq";
    RuleOperator["GT"] = "gt";
    RuleOperator["GTE"] = "gte";
    RuleOperator["LT"] = "lt";
    RuleOperator["LTE"] = "lte";
    RuleOperator["NEQ"] = "neq";
})(RuleOperator = exports.RuleOperator || (exports.RuleOperator = {}));
//# sourceMappingURL=rule.js.map