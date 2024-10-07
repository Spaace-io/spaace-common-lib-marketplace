import { ethers } from 'ethers';

export const WETH_ADDRESS = !process.env.TESTNET
  ? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
  : '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9';

export const ETH_TOKENS = [
  ethers.constants.AddressZero, // Native ETH
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // Mainnet WETH9
  '0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9', // sepolia WETH9
];
