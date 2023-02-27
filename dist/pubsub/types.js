"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubEvents = exports.PubSubSubscriptions = exports.PubSubTopics = void 0;
var PubSubTopics;
(function (PubSubTopics) {
    PubSubTopics["EVENT"] = "event";
    PubSubTopics["NOTIFICATION"] = "notification";
})(PubSubTopics = exports.PubSubTopics || (exports.PubSubTopics = {}));
var PubSubSubscriptions;
(function (PubSubSubscriptions) {
    PubSubSubscriptions["EVENT"] = "event";
    PubSubSubscriptions["NOTIFICATION"] = "notification";
})(PubSubSubscriptions = exports.PubSubSubscriptions || (exports.PubSubSubscriptions = {}));
var PubSubEvents;
(function (PubSubEvents) {
    PubSubEvents["GREETING"] = "greeting";
    PubSubEvents["ORDER"] = "order";
    PubSubEvents["TRANSFER"] = "transfer";
    PubSubEvents["SALE"] = "sale";
})(PubSubEvents = exports.PubSubEvents || (exports.PubSubEvents = {}));
//# sourceMappingURL=types.js.map