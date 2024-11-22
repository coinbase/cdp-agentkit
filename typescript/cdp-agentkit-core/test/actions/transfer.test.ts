import { transferAction } from '../../src/actions';
import type { Wallet } from '../../src/types';

describe('transferAction', () => {
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      transfer: jest.fn(),
    } as any;
  });

  it('should execute transfer successfully', async () => {
    const mockTransfer = {
      transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
      transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
      wait: function() {
        return Promise.resolve(this);
      }
    };

    mockWallet.transfer.mockResolvedValue({
      ...mockTransfer,
      wait: () => Promise.resolve(mockTransfer)
    });

    const input = {
      amount: '0.01',
      assetId: 'usdc',
      destination: 'example.eth',
      gasless: true
    };

    const result = await transferAction.execute(mockWallet, input);

    expect(mockWallet.transfer).toHaveBeenCalledWith({
      amount: input.amount,
      assetId: input.assetId,
      to: input.destination,
      gasless: input.gasless
    });
    expect(result).toContain('Successfully transferred');
    expect(result).toContain(mockTransfer.transactionHash);
    expect(result).toContain('gasless');
  });

  it('should validate required inputs', async () => {
    const input = {
      amount: '0.01'
    };

    const result = await transferAction.execute(mockWallet, input as any);

    expect(mockWallet.transfer).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 