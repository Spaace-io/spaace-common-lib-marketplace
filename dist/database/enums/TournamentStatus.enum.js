"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var TournamentStatus;
(function (TournamentStatus) {
    TournamentStatus["SCHEDULED"] = "scheduled";
    TournamentStatus["LIVE"] = "live";
    TournamentStatus["CALCULATING"] = "calculating";
    TournamentStatus["ENDED"] = "ended";
})(TournamentStatus || (exports.TournamentStatus = TournamentStatus = {}));
(0, graphql_1.registerEnumType)(TournamentStatus, { name: 'TournamentStatus' });
//# sourceMappingURL=TournamentStatus.enum.js.map