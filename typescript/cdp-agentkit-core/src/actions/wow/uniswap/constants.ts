export const UNISWAP_V3_ABI = [
  {
    "inputs": [],
    "name": "fee",
    "outputs": [{"internalType": "uint24", "name": "", "type": "uint24"}],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "liquidity",
    "outputs": [{"internalType": "uint128", "name": "", "type": "uint128"}],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "slot0",
    "outputs": [
      {"internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160"},
      {"internalType": "int24", "name": "tick", "type": "int24"},
      {"internalType": "uint16", "name": "observationIndex", "type": "uint16"},
      {"internalType": "uint16", "name": "observationCardinality", "type": "uint16"},
      {"internalType": "uint16", "name": "observationCardinalityNext", "type": "uint16"},
      {"internalType": "uint8", "name": "feeProtocol", "type": "uint8"},
      {"internalType": "bool", "name": "unlocked", "type": "bool"},
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "token0",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "token1",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function",
  }
];

export const UNISWAP_QUOTER_ABI = [
  {
    "inputs": [
      {"internalType": "bytes", "name": "path", "type": "bytes"},
      {"internalType": "uint256", "name": "amountIn", "type": "uint256"}
    ],
    "name": "quoteExactInput",
    "outputs": [
      {"internalType": "uint256", "name": "amountOut", "type": "uint256"},
      {"internalType": "uint160[]", "name": "sqrtPriceX96AfterList", "type": "uint160[]"},
      {"internalType": "uint32[]", "name": "initializedTicksCrossedList", "type": "uint32[]"},
      {"internalType": "uint256", "name": "gasEstimate", "type": "uint256"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const UNISWAP_ADDRESSES = {
  mainnet: {
    factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    quoter: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    router: "0xE592427A0AEce92De3Edee1F18E0157C05861564"
  },
  testnet: {
    factory: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
    quoter: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    router: "0xE592427A0AEce92De3Edee1F18E0157C05861564"
  }
}; 