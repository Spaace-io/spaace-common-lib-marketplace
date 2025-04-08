"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETH_TOKENS = exports.WETH_ADDRESS = void 0;
const ethers_1 = require("ethers");
exports.WETH_ADDRESS = !process.env.TESTNET
    ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    : '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9';
exports.ETH_TOKENS = [
    ethers_1.ethers.constants.AddressZero, // Native ETH
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Mainnet WETH9
    '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9', // sepolia WETH9
];
//# sourceMappingURL=constants.js.map