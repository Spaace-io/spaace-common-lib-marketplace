"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.n18 = n18;
const ethers_1 = require("ethers");
function n18(amount) {
    return ethers_1.ethers.utils.parseUnits(amount.replace(/_/g, ''), 'ether');
}
//# sourceMappingURL=numbers.js.map