import type { Wallet, SmartContract, Transfer, Trade } from '../src/types';

export const createMockSmartContract = (overrides: Partial<SmartContract> = {}): SmartContract => ({
  contractAddress: '0x123...',
  transaction: {
    transactionHash: '0xabc...',
    transactionLink: 'https://explorer.com/tx/0xabc...'
  },
  wait: jest.fn().mockResolvedValue(overrides.contractAddress ? overrides : this),
  ...overrides
});

export const createMockTransfer = (overrides: Partial<Transfer> = {}): Transfer => ({
  transactionHash: '0xdef...',
  transactionLink: 'https://explorer.com/tx/0xdef...',
  wait: jest.fn().mockResolvedValue(overrides.transactionHash ? overrides : this),
  ...overrides
});

export const createMockTrade = (overrides: Partial<Trade> = {}): Trade => ({
  transaction: {
    transactionHash: '0xghi...',
    transactionLink: 'https://explorer.com/tx/0xghi...'
  },
  toAmount: '100',
  wait: jest.fn().mockResolvedValue(overrides.toAmount ? overrides : this),
  ...overrides
});

export const createMockWallet = (overrides: Partial<Wallet> = {}): jest.Mocked<Wallet> => ({
  networkId: 'base-sepolia',
  getBalance: jest.fn(),
  getDefaultAddress: jest.fn(),
  deployNft: jest.fn(),
  deployToken: jest.fn(),
  mintNft: jest.fn(),
  registerBasename: jest.fn(),
  transfer: jest.fn(),
  trade: jest.fn(),
  wowBuyToken: jest.fn(),
  wowSellToken: jest.fn(),
  wowCreateToken: jest.fn(),
  getWowPoolInfo: jest.fn(),
  getWowQuote: jest.fn(),
  faucet: jest.fn(),
  ...overrides
} as jest.Mocked<Wallet>); 