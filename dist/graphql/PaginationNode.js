"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationNode = void 0;
const graphql_1 = require("@nestjs/graphql");
const __1 = require("..");
exports.PaginationNode = (0, graphql_1.createUnionType)({
    name: 'PaginationNode',
    types: () => [__1.Collection, __1.Item, __1.Order, __1.Sale, __1.Transfer],
});
//# sourceMappingURL=PaginationNode.js.map