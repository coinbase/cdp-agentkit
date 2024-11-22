import { tradeAction } from '../../src/actions';
import type { Wallet } from '../../src/types';

describe('tradeAction', () => {
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      trade: jest.fn(),
    } as any;
  });

  it('should execute trade successfully', async () => {
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

    mockWallet.trade.mockResolvedValue({
      ...mockTrade,
      wait: () => Promise.resolve(mockTrade)
    });

    const input = {
      amount: '0.01',
      fromAssetId: 'eth',
      toAssetId: 'usdc'
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
      amount: '0.01',
      fromAssetId: 'eth',
      toAssetId: 'usdc'
    };

    const result = await tradeAction.execute(mockWallet, input);

    expect(mockWallet.trade).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to trade');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      amount: '0.01'
    };

    const result = await tradeAction.execute(mockWallet, input as any);

    expect(mockWallet.trade).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 