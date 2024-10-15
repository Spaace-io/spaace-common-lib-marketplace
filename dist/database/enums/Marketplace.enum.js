"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Marketplace = void 0;
const graphql_1 = require("@nestjs/graphql");
var Marketplace;
(function (Marketplace) {
    Marketplace["SPAACE"] = "SPAACE";
    Marketplace["OPENSEA"] = "OPENSEA";
    Marketplace["BLUR"] = "BLUR";
})(Marketplace = exports.Marketplace || (exports.Marketplace = {}));
(0, graphql_1.registerEnumType)(Marketplace, {
    name: 'Marketplace',
});
//# sourceMappingURL=Marketplace.enum.js.map