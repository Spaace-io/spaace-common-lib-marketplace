"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var UserStatus;
(function (UserStatus) {
    UserStatus["ACTIVE"] = "ACTIVE";
    UserStatus["REVIEW"] = "REVIEW";
    UserStatus["BLACKLIST"] = "BLACKLIST";
    UserStatus["DELETED"] = "DELETED";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
(0, graphql_1.registerEnumType)(UserStatus, { name: 'UserStatus' });
//# sourceMappingURL=UserStatus.enum.js.map