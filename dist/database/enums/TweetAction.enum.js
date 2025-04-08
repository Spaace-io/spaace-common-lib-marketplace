"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetAction = void 0;
const graphql_1 = require("@nestjs/graphql");
var TweetAction;
(function (TweetAction) {
    TweetAction["LIKE"] = "LIKE";
    TweetAction["REPLY"] = "REPLY";
    TweetAction["REPOST"] = "REPOST";
})(TweetAction || (exports.TweetAction = TweetAction = {}));
(0, graphql_1.registerEnumType)(TweetAction, {
    name: 'TweetAction',
});
//# sourceMappingURL=TweetAction.enum.js.map