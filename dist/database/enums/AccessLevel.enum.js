"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessLevel = void 0;
const graphql_1 = require("@nestjs/graphql");
var AccessLevel;
(function (AccessLevel) {
    AccessLevel["LOCKED"] = "LOCKED";
    AccessLevel["INVITED"] = "INVITED";
    AccessLevel["WHITELISTED"] = "WHITELISTED";
})(AccessLevel || (exports.AccessLevel = AccessLevel = {}));
(0, graphql_1.registerEnumType)(AccessLevel, {
    name: 'AccessLevel',
});
//# sourceMappingURL=AccessLevel.enum.js.map