import { ethers } from 'ethers';

export const WETH_ADDRESS = !process.env.TESTNET
  ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  : '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';

export const ETH_TOKENS = [
  ethers.constants.AddressZero, // Native ETH
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Mainnet WETH9
  '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6', // Goerli WETH9
];
