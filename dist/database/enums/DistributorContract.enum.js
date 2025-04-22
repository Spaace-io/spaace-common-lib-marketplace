"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributorContract = void 0;
const graphql_1 = require("@nestjs/graphql");
var DistributorContract;
(function (DistributorContract) {
    DistributorContract["TRADING_REWARDS"] = "TRADING_REWARDS";
    DistributorContract["REFERRAL_REWARDS"] = "REFERRAL_REWARDS";
    DistributorContract["LOYALTY_REWARDS"] = "LOYALTY_REWARDS";
})(DistributorContract || (exports.DistributorContract = DistributorContract = {}));
(0, graphql_1.registerEnumType)(DistributorContract, {
    name: 'DistributorContract',
});
//# sourceMappingURL=DistributorContract.enum.js.map