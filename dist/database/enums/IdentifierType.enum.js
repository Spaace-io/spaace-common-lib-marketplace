"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentifierType = void 0;
const graphql_1 = require("@nestjs/graphql");
var IdentifierType;
(function (IdentifierType) {
    IdentifierType["WALLET"] = "wallet";
    IdentifierType["EMAIL"] = "email";
    IdentifierType["DISCORD"] = "discord";
    IdentifierType["TWITTER"] = "twitter";
})(IdentifierType || (exports.IdentifierType = IdentifierType = {}));
(0, graphql_1.registerEnumType)(IdentifierType, { name: 'IdentifierType' });
//# sourceMappingURL=IdentifierType.enum.js.map