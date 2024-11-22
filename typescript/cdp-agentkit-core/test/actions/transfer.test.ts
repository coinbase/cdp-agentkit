import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { transferAction } from '../../src/actions/transfer';
import { createMockWallet, createMockTransfer } from '../helpers';

// Constants from Python tests
const MOCK_AMOUNT = "0.01";
const MOCK_ASSET_ID = "usdc";
const MOCK_DESTINATION = "example.eth";
const MOCK_GASLESS = true;

describe('transferAction', () => {
  const mockWallet = createMockWallet();
  const mockTransfer = createMockTransfer({
    transactionHash: '0x1234567890abcdef...',
    transactionLink: 'https://basescan.org/tx/0x1234567890abcdef...'
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.transfer.mockResolvedValue(mockTransfer);
  });

  it('should execute transfer successfully', async () => {
    const input = {
      amount: MOCK_AMOUNT,
      assetId: MOCK_ASSET_ID,
      destination: MOCK_DESTINATION,
      gasless: MOCK_GASLESS
    };

    const result = await transferAction.execute(mockWallet, input);

    expect(mockWallet.transfer).toHaveBeenCalledWith(input);
    expect(result).toContain('Successfully transferred');
    expect(result).toContain(mockTransfer.transactionHash);
    expect(result).toContain('gasless');
  });

  it('should handle non-gasless transfers', async () => {
    const input = {
      amount: MOCK_AMOUNT,
      assetId: 'eth',
      destination: '0x1234567890abcdef...',
      gasless: false
    };

    const result = await transferAction.execute(mockWallet, input);

    expect(mockWallet.transfer).toHaveBeenCalledWith(input);
    expect(result).toContain('Successfully transferred');
    expect(result).not.toContain('gasless');
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Insufficient funds');
    mockWallet.transfer.mockRejectedValue(error);

    const input = {
      amount: MOCK_AMOUNT,
      assetId: MOCK_ASSET_ID,
      destination: MOCK_DESTINATION,
      gasless: MOCK_GASLESS
    };

    const result = await transferAction.execute(mockWallet, input);

    expect(mockWallet.transfer).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to transfer');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      amount: MOCK_AMOUNT,
      // missing assetId and destination
    };

    const result = await transferAction.execute(mockWallet, input as any);

    expect(mockWallet.transfer).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 