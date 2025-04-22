"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strip0x = strip0x;
function strip0x(text) {
    if (Array.isArray(text))
        return text.map((elem) => strip0x(elem));
    if (text === undefined || text === null)
        return text;
    text = text.toLowerCase();
    return text.startsWith('0x') ? text.substring(2) : text;
}
//# sourceMappingURL=strip0x.js.map