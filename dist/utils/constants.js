"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETH_TOKENS = exports.WETH_ADDRESS = void 0;
const ethers_1 = require("ethers");
exports.WETH_ADDRESS = !process.env.TESTNET
    ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    : '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14';
exports.ETH_TOKENS = [
    ethers_1.ethers.constants.AddressZero,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', // sepolia WETH9
];
//# sourceMappingURL=constants.js.map