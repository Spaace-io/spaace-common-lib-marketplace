"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBSUB_TOPICS = exports.PubsubTopic = void 0;
var PubsubTopic;
(function (PubsubTopic) {
    // Kept for backwards compatibility
    PubsubTopic["TRIGGERS"] = "triggers";
    // New one for metadata import
    PubsubTopic["METADATA_IMPORT_TRIGGERS"] = "metadata-import-triggers";
})(PubsubTopic = exports.PubsubTopic || (exports.PubsubTopic = {}));
exports.PUBSUB_TOPICS = Object.entries(PubsubTopic).reduce((acc, [key, value]) => (Object.assign(Object.assign({}, acc), { [value]: `${key}-${process.env.TESTNET ? 'goerli' : 'ethereum'}` })), {});
//# sourceMappingURL=topics.js.map