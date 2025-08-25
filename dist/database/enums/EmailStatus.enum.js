"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["UNSET"] = "UNSET";
    EmailStatus["PENDING"] = "PENDING";
    EmailStatus["VERIFIED"] = "VERIFIED";
})(EmailStatus || (exports.EmailStatus = EmailStatus = {}));
(0, graphql_1.registerEnumType)(EmailStatus, {
    name: 'EmailStatus',
});
//# sourceMappingURL=EmailStatus.enum.js.map