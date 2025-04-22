"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha1 = sha1;
const crypto = require("crypto");
function sha1(text) {
    const hash = crypto.createHash('sha1');
    hash.update(text);
    return hash.digest('hex');
}
//# sourceMappingURL=hashes.js.map