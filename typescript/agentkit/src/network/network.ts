// Currently only built for EVM networks

import {
  Chain,
  mainnet,
  sepolia,
  baseSepolia,
  arbitrumSepolia,
  optimismSepolia,
  base,
  arbitrum,
  optimism,
  polygonMumbai,
  polygon,
} from "viem/chains";

/**
 * List of supported EVM chain IDs
 */
export const CHAIN_IDS = [
  1, 11155111, 137, 80001, 8453, 84532, 42161, 421614, 10, 11155420,
] as const;

export type CHAIN_ID = (typeof CHAIN_IDS)[number];

/**
 * List of supported Coinbase network IDs
 */
export const NETWORK_IDS = [
  "ethereum-mainnet",
  "ethereum-sepolia",
  "polygon-mainnet",
  "polygon-mumbai",
  "base-mainnet",
  "base-sepolia",
  "arbitrum-mainnet",
  "arbitrum-sepolia",
  "optimism-mainnet",
  "optimism-sepolia",
] as const;

export type NETWORK_ID = (typeof NETWORK_IDS)[number];

/**
 * Maps EVM chain IDs to Coinbase network IDs
 */
export const CHAIN_ID_TO_NETWORK_ID = {
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
} as const satisfies Record<CHAIN_ID, NETWORK_ID>;

/**
 * Maps Coinbase network IDs to EVM chain IDs
 */
export const NETWORK_ID_TO_CHAIN_ID: Record<NETWORK_ID, CHAIN_ID> = Object.entries(
  CHAIN_ID_TO_NETWORK_ID,
).reduce(
  (acc, [chainId, networkId]) => {
    acc[networkId] = Number(chainId) as CHAIN_ID;
    return acc;
  },
  {} as Record<NETWORK_ID, CHAIN_ID>,
);

/**
 * Maps Coinbase network IDs to Viem chain objects
 */
export const NETWORK_ID_TO_VIEM_CHAIN = {
  "ethereum-mainnet": mainnet,
  "ethereum-sepolia": sepolia,
  "polygon-mainnet": polygon,
  "polygon-mumbai": polygonMumbai,
  "base-mainnet": base,
  "base-sepolia": baseSepolia,
  "arbitrum-mainnet": arbitrum,
  "arbitrum-sepolia": arbitrumSepolia,
  "optimism-mainnet": optimism,
  "optimism-sepolia": optimismSepolia,
} as const satisfies Record<NETWORK_ID, Chain>;
