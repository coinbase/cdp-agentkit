import { wowBuyTokenAction } from '../../../src/actions';
import type { Wallet } from '../../../src/types';

describe('wowBuyTokenAction', () => {
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      wowBuyToken: jest.fn(),
    } as any;
  });

  it('should buy WOW token successfully', async () => {
    const mockTrade = {
      transaction: {
        transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
      },
      toAmount: '100.0',
      wait: function() {
        return Promise.resolve(this);
      }
    };

    mockWallet.wowBuyToken.mockResolvedValue({
      ...mockTrade,
      wait: () => Promise.resolve(mockTrade)
    });

    const input = {
      tokenAddress: '0x1234567890abcdef1234567890abcdef12345678',
      amountInEth: '0.1'
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
      tokenAddress: '0x1234567890abcdef1234567890abcdef12345678',
      amountInEth: '0.1'
    };

    const result = await wowBuyTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowBuyToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to buy WOW token');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {};

    const result = await wowBuyTokenAction.execute(mockWallet, input as any);

    expect(mockWallet.wowBuyToken).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 