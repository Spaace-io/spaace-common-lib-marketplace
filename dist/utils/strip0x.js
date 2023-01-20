"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strip0x = void 0;
function strip0x(text) {
    if (Array.isArray(text))
        return text.map((elem) => strip0x(elem));
    if (text === null)
        return null;
    text = text.toLowerCase();
    return text.startsWith('0x') ? text.substring(2) : text;
}
exports.strip0x = strip0x;
//# sourceMappingURL=strip0x.js.map