"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordTierEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var DiscordTierEnum;
(function (DiscordTierEnum) {
    DiscordTierEnum["SILVER"] = "SILVER";
    DiscordTierEnum["GOLD"] = "GOLD";
    DiscordTierEnum["PLATINUM"] = "PLATINUM";
    DiscordTierEnum["DIAMOND"] = "DIAMOND";
})(DiscordTierEnum || (exports.DiscordTierEnum = DiscordTierEnum = {}));
(0, graphql_1.registerEnumType)(DiscordTierEnum, {
    name: 'DiscordTier',
});
//# sourceMappingURL=DiscordTierEnum.enum.js.map