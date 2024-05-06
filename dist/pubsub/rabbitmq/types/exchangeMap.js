"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeMap = void 0;
const types_1 = require("../../types");
exports.exchangeMap = {
    [types_1.PubSubTopic.TRIGGERS]: 'triggers-exchange',
    [types_1.PubSubTopic.DELAYED_TRIGGERS]: 'delayed-triggers-exchange',
    [types_1.PubSubTopic.COLLECTION_IMPORT]: 'collection-import-exchange',
    [types_1.PubSubTopic.SEARCH_INDEX]: 'search-index-exchange',
    [types_1.PubSubTopic.DATA]: 'data-exchange',
    [types_1.PubSubTopic.LEVEL_PROGRESS]: 'level-progress',
};
//# sourceMappingURL=exchangeMap.js.map