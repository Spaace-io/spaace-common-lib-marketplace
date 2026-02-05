"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankChestState = void 0;
const graphql_1 = require("@nestjs/graphql");
var RankChestState;
(function (RankChestState) {
    RankChestState["CLAIMABLE"] = "CLAIMABLE";
    RankChestState["CLAIMED"] = "CLAIMED";
})(RankChestState || (exports.RankChestState = RankChestState = {}));
(0, graphql_1.registerEnumType)(RankChestState, { name: 'RankChestState' });
//# sourceMappingURL=RankChestState.enum.js.map