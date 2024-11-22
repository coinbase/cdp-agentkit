import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { wowSellTokenAction } from '../../../src/actions/wow/sell-token';
import { createMockWallet, createMockTrade } from '../../helpers';

// Constants from Python tests
const MOCK_TOKEN_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const MOCK_AMOUNT_IN = "100.0";
const MOCK_TX_HASH = "0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

describe('wowSellTokenAction', () => {
  const mockWallet = createMockWallet();
  const mockTrade = createMockTrade({
    transaction: {
      transactionHash: MOCK_TX_HASH,
      transactionLink: `https://basescan.org/tx/${MOCK_TX_HASH}`
    },
    toAmount: '0.1'  // ETH received for tokens
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.wowSellToken.mockResolvedValue(mockTrade);
  });

  it('should sell WOW token successfully', async () => {
    const input = {
      tokenAddress: MOCK_TOKEN_ADDRESS,
      amountIn: MOCK_AMOUNT_IN
    };

    const result = await wowSellTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowSellToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Sold');
    expect(result).toContain(mockTrade.transaction.transactionHash);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to sell token');
    mockWallet.wowSellToken.mockRejectedValue(error);

    const input = {
      tokenAddress: MOCK_TOKEN_ADDRESS,
      amountIn: MOCK_AMOUNT_IN
    };

    const result = await wowSellTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowSellToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to sell WOW token');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      // missing tokenAddress and amountIn
    };

    const result = await wowSellTokenAction.execute(mockWallet, input as any);

    expect(mockWallet.wowSellToken).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 