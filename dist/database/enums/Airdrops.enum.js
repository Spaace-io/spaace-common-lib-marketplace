"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirdropUsersChestsStatusChapter1 = exports.AirdropUsersChestsStatus = exports.AirdropTiersNameChapter1 = exports.AirdropTiersName = exports.AirdropChestsTypeChapter1 = exports.AirdropChestsType = void 0;
const graphql_1 = require("@nestjs/graphql");
var AirdropChestsType;
(function (AirdropChestsType) {
    AirdropChestsType["MYTHIC"] = "Mythic";
    AirdropChestsType["LEGENDARY"] = "Legendary";
    AirdropChestsType["EPIC"] = "Epic";
    AirdropChestsType["RARE"] = "Rare";
    AirdropChestsType["COMMON"] = "Common";
})(AirdropChestsType || (exports.AirdropChestsType = AirdropChestsType = {}));
var AirdropChestsTypeChapter1;
(function (AirdropChestsTypeChapter1) {
    AirdropChestsTypeChapter1["MYTHIC"] = "Mythic";
    AirdropChestsTypeChapter1["LEGENDARY"] = "Legendary";
    AirdropChestsTypeChapter1["EPIC"] = "Epic";
    AirdropChestsTypeChapter1["RARE"] = "Rare";
    AirdropChestsTypeChapter1["COMMON"] = "Common";
})(AirdropChestsTypeChapter1 || (exports.AirdropChestsTypeChapter1 = AirdropChestsTypeChapter1 = {}));
(0, graphql_1.registerEnumType)(AirdropChestsType, {
    name: 'AirdropChestsType',
});
(0, graphql_1.registerEnumType)(AirdropChestsTypeChapter1, {
    name: 'AirdropChestsTypeChapter1',
});
var AirdropTiersName;
(function (AirdropTiersName) {
    AirdropTiersName["TIER_1"] = "TIER_1";
    AirdropTiersName["TIER_2"] = "TIER_2";
    AirdropTiersName["TIER_3"] = "TIER_3";
    AirdropTiersName["TIER_4"] = "TIER_4";
    AirdropTiersName["TIER_5"] = "TIER_5";
    AirdropTiersName["TIER_6"] = "TIER_6";
    AirdropTiersName["TIER_7"] = "TIER_7";
    AirdropTiersName["TIER_8"] = "TIER_8";
    AirdropTiersName["TIER_9"] = "TIER_9";
    AirdropTiersName["TIER_10"] = "TIER_10";
    AirdropTiersName["TIER_11"] = "TIER_11";
    AirdropTiersName["TIER_12"] = "TIER_12";
    AirdropTiersName["TIER_13"] = "TIER_13";
    AirdropTiersName["TIER_14"] = "TIER_14";
    AirdropTiersName["TIER_15"] = "TIER_15";
})(AirdropTiersName || (exports.AirdropTiersName = AirdropTiersName = {}));
var AirdropTiersNameChapter1;
(function (AirdropTiersNameChapter1) {
    AirdropTiersNameChapter1["D5"] = "D5";
    AirdropTiersNameChapter1["P1"] = "P1";
    AirdropTiersNameChapter1["P2"] = "P2";
    AirdropTiersNameChapter1["P3"] = "P3";
    AirdropTiersNameChapter1["P4"] = "P4";
    AirdropTiersNameChapter1["P5"] = "P5";
    AirdropTiersNameChapter1["G1"] = "G1";
    AirdropTiersNameChapter1["G2"] = "G2";
    AirdropTiersNameChapter1["G3"] = "G3";
    AirdropTiersNameChapter1["G4"] = "G4";
    AirdropTiersNameChapter1["G5"] = "G5";
    AirdropTiersNameChapter1["S1"] = "S1";
    AirdropTiersNameChapter1["S2"] = "S2";
    AirdropTiersNameChapter1["S3"] = "S3";
    AirdropTiersNameChapter1["S4"] = "S4";
    AirdropTiersNameChapter1["S5"] = "S5";
    AirdropTiersNameChapter1["B1"] = "B1";
    AirdropTiersNameChapter1["B2"] = "B2";
    AirdropTiersNameChapter1["B3"] = "B3";
    AirdropTiersNameChapter1["B4"] = "B4";
})(AirdropTiersNameChapter1 || (exports.AirdropTiersNameChapter1 = AirdropTiersNameChapter1 = {}));
(0, graphql_1.registerEnumType)(AirdropTiersName, {
    name: 'AirdropTiersName',
});
(0, graphql_1.registerEnumType)(AirdropTiersNameChapter1, {
    name: 'AirdropTiersNameChapter1',
});
var AirdropUsersChestsStatus;
(function (AirdropUsersChestsStatus) {
    AirdropUsersChestsStatus["LOCKED"] = "LOCKED";
    AirdropUsersChestsStatus["UNLOCKED"] = "UNLOCKED";
    AirdropUsersChestsStatus["CLAIMABLE"] = "CLAIMABLE";
})(AirdropUsersChestsStatus || (exports.AirdropUsersChestsStatus = AirdropUsersChestsStatus = {}));
var AirdropUsersChestsStatusChapter1;
(function (AirdropUsersChestsStatusChapter1) {
    AirdropUsersChestsStatusChapter1["UNLOCKED"] = "UNLOCKED";
    AirdropUsersChestsStatusChapter1["CLAIMABLE"] = "CLAIMABLE";
})(AirdropUsersChestsStatusChapter1 || (exports.AirdropUsersChestsStatusChapter1 = AirdropUsersChestsStatusChapter1 = {}));
(0, graphql_1.registerEnumType)(AirdropUsersChestsStatus, {
    name: 'AirdropUsersChestsStatus',
});
(0, graphql_1.registerEnumType)(AirdropUsersChestsStatusChapter1, {
    name: 'AirdropUsersChestsStatusChapter1',
});
//# sourceMappingURL=Airdrops.enum.js.map