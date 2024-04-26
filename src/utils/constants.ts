import { ethers } from 'ethers';

export const WETH_ADDRESS = !process.env.TESTNET
  ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  : '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14';

export const ETH_TOKENS = [
  ethers.constants.AddressZero, // Native ETH
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Mainnet WETH9
  '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14', // sepolia WETH9
];
