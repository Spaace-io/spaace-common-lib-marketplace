"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaDivisionName = void 0;
const graphql_1 = require("@nestjs/graphql");
var ArenaDivisionName;
(function (ArenaDivisionName) {
    ArenaDivisionName["DIAMOND"] = "DIAMOND";
    ArenaDivisionName["PLATINUM"] = "PLATINUM";
    ArenaDivisionName["GOLD"] = "GOLD";
    ArenaDivisionName["SILVER"] = "SILVER";
    ArenaDivisionName["BRONZE"] = "BRONZE";
})(ArenaDivisionName = exports.ArenaDivisionName || (exports.ArenaDivisionName = {}));
(0, graphql_1.registerEnumType)(ArenaDivisionName, { name: 'ArenaDivisionName' });
//# sourceMappingURL=ArenaDivisionName.enum.js.map