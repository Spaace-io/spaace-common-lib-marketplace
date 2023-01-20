"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitChunks = void 0;
function* splitChunks(array, chunkSize) {
    array = [...array];
    while (array.length)
        yield array.splice(0, chunkSize);
}
exports.splitChunks = splitChunks;
//# sourceMappingURL=chunks.js.map