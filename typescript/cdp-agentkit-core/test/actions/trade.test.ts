import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { tradeAction } from '../../src/actions/trade';
import { createMockWallet, createMockTrade } from '../helpers';

// Constants from Python tests
const MOCK_AMOUNT = "0.01";
const MOCK_FROM_ASSET_ID = "eth";
const MOCK_TO_ASSET_ID = "usdc";

describe('tradeAction', () => {
  const mockWallet = createMockWallet();
  const mockTrade = createMockTrade({
    transaction: {
      transactionHash: '0x1234567890abcdef...',
      transactionLink: 'https://basescan.org/tx/0x1234567890abcdef...'
    },
    toAmount: '100.0'
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.trade.mockResolvedValue(mockTrade);
  });

  it('should execute trade successfully', async () => {
    const input = {
      amount: MOCK_AMOUNT,
      fromAssetId: MOCK_FROM_ASSET_ID,
      toAssetId: MOCK_TO_ASSET_ID
    };

    const result = await tradeAction.execute(mockWallet, input);

    expect(mockWallet.trade).toHaveBeenCalledWith(input);
    expect(result).toContain('Traded');
    expect(result).toContain(mockTrade.toAmount);
    expect(result).toContain(mockTrade.transaction.transactionHash);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to trade');
    mockWallet.trade.mockRejectedValue(error);

    const input = {
      amount: MOCK_AMOUNT,
      fromAssetId: MOCK_FROM_ASSET_ID,
      toAssetId: MOCK_TO_ASSET_ID
    };

    const result = await tradeAction.execute(mockWallet, input);

    expect(mockWallet.trade).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to trade');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      amount: MOCK_AMOUNT,
      // missing fromAssetId and toAssetId
    };

    const result = await tradeAction.execute(mockWallet, input as any);

    expect(mockWallet.trade).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 