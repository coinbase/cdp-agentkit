import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { wowBuyTokenAction } from '../../../src/actions/wow/buy-token';
import { createMockWallet, createMockTrade } from '../../helpers';

// Constants from Python tests
const MOCK_TOKEN_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const MOCK_AMOUNT_IN_ETH = "0.1";
const MOCK_TX_HASH = "0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

describe('wowBuyTokenAction', () => {
  const mockWallet = createMockWallet();
  const mockTrade = createMockTrade({
    transaction: {
      transactionHash: MOCK_TX_HASH,
      transactionLink: `https://basescan.org/tx/${MOCK_TX_HASH}`
    },
    toAmount: '100.0'
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.wowBuyToken.mockResolvedValue(mockTrade);
  });

  it('should buy WOW token successfully', async () => {
    const input = {
      tokenAddress: MOCK_TOKEN_ADDRESS,
      amountInEth: MOCK_AMOUNT_IN_ETH
    };

    const result = await wowBuyTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowBuyToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Bought WOW token');
    expect(result).toContain(mockTrade.transaction.transactionHash);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to buy token');
    mockWallet.wowBuyToken.mockRejectedValue(error);

    const input = {
      tokenAddress: MOCK_TOKEN_ADDRESS,
      amountInEth: MOCK_AMOUNT_IN_ETH
    };

    const result = await wowBuyTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowBuyToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to buy WOW token');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      // missing tokenAddress and amountInEth
    };

    const result = await wowBuyTokenAction.execute(mockWallet, input as any);

    expect(mockWallet.wowBuyToken).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 