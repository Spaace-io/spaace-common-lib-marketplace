"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETH_TOKENS = exports.WETH_ADDRESS = void 0;
const ethers_1 = require("ethers");
exports.WETH_ADDRESS = !process.env.TESTNET
    ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
    : '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
exports.ETH_TOKENS = [
    ethers_1.ethers.constants.AddressZero,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // Goerli WETH9
];
//# sourceMappingURL=constants.js.map