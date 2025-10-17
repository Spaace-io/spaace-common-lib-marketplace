"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationAction = void 0;
const graphql_1 = require("@nestjs/graphql");
var ModerationAction;
(function (ModerationAction) {
    ModerationAction["BULK_SET_STATUS"] = "BULK_SET_STATUS";
    ModerationAction["MANUAL_SET_STATUS"] = "MANUAL_SET_STATUS";
    ModerationAction["ADD_BLACKLIST_ID"] = "ADD_BLACKLIST_ID";
    ModerationAction["REMOVE_BLACKLIST_ID"] = "REMOVE_BLACKLIST_ID";
    ModerationAction["AUTO_REVIEW"] = "AUTO_REVIEW";
})(ModerationAction || (exports.ModerationAction = ModerationAction = {}));
(0, graphql_1.registerEnumType)(ModerationAction, { name: 'ModerationAction' });
//# sourceMappingURL=ModerationAction.enum.js.map