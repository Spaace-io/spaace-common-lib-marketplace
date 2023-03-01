"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityTime = exports.TOP_50_VOLUME = exports.MIN_SALE_PRICE = void 0;
const utils_1 = require("../../../utils");
const types_1 = require("../types");
exports.MIN_SALE_PRICE = {
    property: types_1.RuleEventProperty.SALE_PRICE,
    operator: types_1.RuleOperator.GTE,
    value: (0, utils_1.n18)('0.05').toString(),
};
exports.TOP_50_VOLUME = {
    property: types_1.RuleEventProperty.VOLUME_RANKING,
    operator: types_1.RuleOperator.LTE,
    value: '50',
};
const activityTime = (hours) => {
    return {
        property: types_1.RuleEventProperty.LIFE_TIME,
        operator: types_1.RuleOperator.GTE,
        value: hours,
    };
};
exports.activityTime = activityTime;
//# sourceMappingURL=constants.js.map