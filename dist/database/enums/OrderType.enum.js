"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderType = void 0;
const graphql_1 = require("@nestjs/graphql");
var OrderType;
(function (OrderType) {
    OrderType["ASK"] = "ASK";
    OrderType["BID"] = "BID";
    OrderType["ENGLISH_AUCTION"] = "ENGLISH_AUCTION";
    OrderType["DUTCH_AUCTION"] = "DUTCH_AUCTION";
})(OrderType = exports.OrderType || (exports.OrderType = {}));
(0, graphql_1.registerEnumType)(OrderType, {
    name: 'OrderType',
});
//# sourceMappingURL=OrderType.enum.js.map