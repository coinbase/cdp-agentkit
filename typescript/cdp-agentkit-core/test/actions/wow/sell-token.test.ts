import { wowSellTokenAction } from '../../../src/actions';
import type { Wallet } from '../../../src/types';

describe('wowSellTokenAction', () => {
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      wowSellToken: jest.fn(),
    } as any;
  });

  it('should sell WOW token successfully', async () => {
    const mockTrade = {
      transaction: {
        transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
      },
      toAmount: '0.5',
      wait: function() {
        return Promise.resolve(this);
      }
    };

    mockWallet.wowSellToken.mockResolvedValue({
      ...mockTrade,
      wait: () => Promise.resolve(mockTrade)
    });

    const input = {
      tokenAddress: '0x1234567890abcdef1234567890abcdef12345678',
      amountIn: '100.0'
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
      tokenAddress: '0x1234567890abcdef1234567890abcdef12345678',
      amountIn: '100.0'
    };

    const result = await wowSellTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowSellToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to sell WOW token');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {};

    const result = await wowSellTokenAction.execute(mockWallet, input as any);

    expect(mockWallet.wowSellToken).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 