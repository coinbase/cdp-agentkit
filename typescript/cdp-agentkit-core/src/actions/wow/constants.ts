export const WOW_ABI = [
  {
    "type": "function",
    "name": "implementation",
    "inputs": [],
    "outputs": [{"name": "", "type": "address", "internalType": "address"}],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "initialize",
    "inputs": [{"name": "_owner", "type": "address", "internalType": "address"}],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [{"name": "", "type": "address", "internalType": "address"}],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "proxiableUUID",
    "inputs": [],
    "outputs": [{"name": "", "type": "bytes32", "internalType": "bytes32"}],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "tokenImplementation",
    "inputs": [],
    "outputs": [{"name": "", "type": "address", "internalType": "address"}],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "transferOwnership",
    "inputs": [{"name": "newOwner", "type": "address", "internalType": "address"}],
    "outputs": [],
    "stateMutability": "nonpayable",
  }
];

export const WOW_ADDRESSES = {
  mainnet: {
    factory: "0x1234...",
    router: "0x5678..."
  },
  testnet: {
    factory: "0xabcd...",
    router: "0xefgh..."
  }
};

export const REGISTRATION_DURATION = 31536000; // 1 year in seconds 