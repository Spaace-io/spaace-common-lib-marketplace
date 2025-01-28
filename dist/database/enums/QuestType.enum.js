"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestType = void 0;
const graphql_1 = require("@nestjs/graphql");
var QuestType;
(function (QuestType) {
    QuestType["GENESIS"] = "GENESIS";
    QuestType["PRIME"] = "PRIME";
    QuestType["DAILY"] = "DAILY";
    QuestType["PROGRESSIVE"] = "PROGRESSIVE";
})(QuestType = exports.QuestType || (exports.QuestType = {}));
(0, graphql_1.registerEnumType)(QuestType, {
    name: 'QuestType',
});
//# sourceMappingURL=QuestType.enum.js.map