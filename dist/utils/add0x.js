"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add0x = add0x;
/**
 * Adds '0x' prefix to a string if it doesn't already have it
 * @param text The string or array of strings to add '0x' prefix to
 * @returns The string or array with '0x' prefix added
 */
function add0x(text) {
    if (Array.isArray(text)) {
        return text.map((elem) => add0x(elem));
    }
    if (text === undefined || text === null) {
        return text;
    }
    return (text.startsWith('0x') ? text : `0x${text}`);
}
//# sourceMappingURL=add0x.js.map