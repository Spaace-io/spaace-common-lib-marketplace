"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentRewardType = void 0;
const graphql_1 = require("@nestjs/graphql");
var TournamentRewardType;
(function (TournamentRewardType) {
    TournamentRewardType["XP"] = "XP";
    TournamentRewardType["USD"] = "USD";
})(TournamentRewardType || (exports.TournamentRewardType = TournamentRewardType = {}));
(0, graphql_1.registerEnumType)(TournamentRewardType, {
    name: 'TournamentRewardType',
    description: 'Type of reward for tournament: XP or USD (Spaace tokens)',
});
//# sourceMappingURL=TournamentRewardType.enum.js.map