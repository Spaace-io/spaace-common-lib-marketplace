"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankChestXpOutcome = void 0;
const graphql_1 = require("@nestjs/graphql");
var RankChestXpOutcome;
(function (RankChestXpOutcome) {
    RankChestXpOutcome["NONE"] = "NONE";
    RankChestXpOutcome["SMALL"] = "SMALL";
    RankChestXpOutcome["MID_LOW"] = "MID_LOW";
    RankChestXpOutcome["MID_HIGH"] = "MID_HIGH";
    RankChestXpOutcome["HIGH"] = "HIGH";
})(RankChestXpOutcome || (exports.RankChestXpOutcome = RankChestXpOutcome = {}));
(0, graphql_1.registerEnumType)(RankChestXpOutcome, { name: 'RankChestXpOutcome' });
//# sourceMappingURL=RankChestXpOutcome.enum.js.map