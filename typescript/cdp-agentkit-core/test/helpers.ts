import type { Wallet, SmartContract, Transfer, Trade } from '../src/types';

export const createMockSmartContract = (overrides: Partial<SmartContract> = {}): SmartContract => {
  const contract = {
    contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
    transaction: {
      transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
      transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
    },
    wait: jest.fn()
  };
  
  contract.wait.mockResolvedValue(contract);
  
  return {
    ...contract,
    ...overrides
  };
};

export const createMockTransfer = (overrides: Partial<Transfer> = {}): Transfer => {
  const transfer = {
    transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
    wait: jest.fn()
  };
  
  transfer.wait.mockResolvedValue(transfer);
  
  return {
    ...transfer,
    ...overrides
  };
};

export const createMockTrade = (overrides: Partial<Trade> = {}): Trade => {
  const trade = {
    transaction: {
      transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
      transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
    },
    toAmount: '100.0',
    wait: jest.fn()
  };
  
  trade.wait.mockResolvedValue(trade);
  
  return {
    ...trade,
    ...overrides
  };
};

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