"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const graphql_1 = require("@nestjs/graphql");
const __1 = require("..");
exports.Event = (0, graphql_1.createUnionType)({
    name: 'Event',
    types: () => [__1.Transfer, __1.Order, __1.Sale],
});
//# sourceMappingURL=Event.js.map