import { base, mainnet, polygon, arbitrum } from "viem/chains";

// Mapping of chain IDs to WETH addresses
export const WETH_ADDRESSES = {
  [mainnet.id]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  [base.id]: "0x4200000000000000000000000000000000000006",
  [arbitrum.id]: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  [polygon.id]: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
};

export const ME_EVM_BASE_URL = "https://api-mainnet.magiceden.dev/v3/rtp";

/**
 * Minimal ABI for the WETH deposit function.
 */
export const WETH_ABI = [
  {
    name: "deposit",
    type: "function",
    stateMutability: "payable",
    inputs: [],
    outputs: [],
  },
];

export const CHAIN_ID_TO_NETWORK_ID: Record<number, string> = {
  1: "ethereum-mainnet",
  11155111: "ethereum-sepolia",
  137: "polygon-mainnet",
  80001: "polygon-mumbai",
  8453: "base-mainnet",
  84532: "base-sepolia",
  42161: "arbitrum-mainnet",
  421614: "arbitrum-sepolia",
  10: "optimism-mainnet",
  11155420: "optimism-sepolia",
};

export const tokenRegex = /^0x[a-fA-F0-9]{40}:[0-9]+$/;
