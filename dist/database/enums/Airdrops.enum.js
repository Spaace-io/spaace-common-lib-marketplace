"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirdropUsersChestsStatus = exports.AirdropTiersName = exports.AirdropChestsType = void 0;
const graphql_1 = require("@nestjs/graphql");
var AirdropChestsType;
(function (AirdropChestsType) {
    AirdropChestsType["MYTHIC"] = "Mythic";
    AirdropChestsType["LEGENDARY"] = "Legendary";
    AirdropChestsType["RARE"] = "Rare";
    AirdropChestsType["UNCOMMON"] = "Uncommon";
    AirdropChestsType["COMMON"] = "Common";
})(AirdropChestsType || (exports.AirdropChestsType = AirdropChestsType = {}));
(0, graphql_1.registerEnumType)(AirdropChestsType, {
    name: 'AirdropChestsType',
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
(0, graphql_1.registerEnumType)(AirdropTiersName, {
    name: 'AirdropTiersName',
});
var AirdropUsersChestsStatus;
(function (AirdropUsersChestsStatus) {
    AirdropUsersChestsStatus["LOCKED"] = "LOCKED";
    AirdropUsersChestsStatus["UNLOCKED"] = "UNLOCKED";
    AirdropUsersChestsStatus["CLAIMABLE"] = "CLAIMABLE";
})(AirdropUsersChestsStatus || (exports.AirdropUsersChestsStatus = AirdropUsersChestsStatus = {}));
(0, graphql_1.registerEnumType)(AirdropUsersChestsStatus, {
    name: 'AirdropUsersChestsStatus',
});
//# sourceMappingURL=Airdrops.enum.js.map