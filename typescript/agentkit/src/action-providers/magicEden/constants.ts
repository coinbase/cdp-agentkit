export const EVM_BASE_URL = "https://api-mainnet.magiceden.dev/v3/rtp";

export const WETH_ADDRESS_ETHEREUM = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
export const WETH_ADDRESS_BASE = "0x4200000000000000000000000000000000000006";

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
