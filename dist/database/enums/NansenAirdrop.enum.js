"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NansenChestStatus = exports.NansenChestType = exports.NansenRewardType = exports.NansenTier = void 0;
const graphql_1 = require("@nestjs/graphql");
var NansenTier;
(function (NansenTier) {
    NansenTier["GREEN"] = "Green";
    NansenTier["ICE"] = "Ice";
    NansenTier["NORTH"] = "North";
    NansenTier["STAR"] = "Star";
})(NansenTier || (exports.NansenTier = NansenTier = {}));
var NansenRewardType;
(function (NansenRewardType) {
    NansenRewardType["MULTIPLIER"] = "MULTIPLIER";
    NansenRewardType["CHEST"] = "CHEST";
})(NansenRewardType || (exports.NansenRewardType = NansenRewardType = {}));
var NansenChestType;
(function (NansenChestType) {
    NansenChestType["INITIAL"] = "INITIAL";
    NansenChestType["SILVER_BONUS"] = "SILVER_BONUS";
    NansenChestType["GOLD_BONUS"] = "GOLD_BONUS";
})(NansenChestType || (exports.NansenChestType = NansenChestType = {}));
var NansenChestStatus;
(function (NansenChestStatus) {
    NansenChestStatus["LOCKED"] = "LOCKED";
    NansenChestStatus["UNLOCKED"] = "UNLOCKED";
    NansenChestStatus["CLAIMED"] = "CLAIMED";
})(NansenChestStatus || (exports.NansenChestStatus = NansenChestStatus = {}));
(0, graphql_1.registerEnumType)(NansenTier, {
    name: 'NansenTier',
});
(0, graphql_1.registerEnumType)(NansenRewardType, {
    name: 'NansenRewardType',
});
(0, graphql_1.registerEnumType)(NansenChestType, {
    name: 'NansenChestType',
});
(0, graphql_1.registerEnumType)(NansenChestStatus, {
    name: 'NansenChestStatus',
});
//# sourceMappingURL=NansenAirdrop.enum.js.map