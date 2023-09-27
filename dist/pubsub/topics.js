"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBSUB_TOPICS = exports.PubsubTopic = void 0;
var PubsubTopic;
(function (PubsubTopic) {
    // Kept for backwards compatibility
    PubsubTopic["TRIGGERS"] = "triggers";
    // New one for metadata import
    PubsubTopic["METADATA_IMPORT"] = "metadata-import";
})(PubsubTopic = exports.PubsubTopic || (exports.PubsubTopic = {}));
exports.PUBSUB_TOPICS = Object.fromEntries(Object.entries(PubsubTopic).map(([k, v]) => [
    k,
    `${v}-${process.env.ENVIRONMENT}`,
]));
//# sourceMappingURL=topics.js.map