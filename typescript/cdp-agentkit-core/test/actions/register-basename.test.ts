import { registerBasenameAction } from '../../src/actions';
import type { Wallet } from '../../src/types';

describe('registerBasenameAction', () => {
  let mockWallet: jest.Mocked<Wallet>;
  const MOCK_CONTRACT_ADDRESS = '0x1234567890abcdef1234567890abcdef12345678';

  beforeEach(() => {
    mockWallet = {
      networkId: 'base-sepolia',
      registerBasename: jest.fn(),
    } as any;
  });

  it('should register basename successfully', async () => {
    const mockContract = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      transaction: {
        transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
      },
      wait: function() {
        return Promise.resolve(this);
      }
    };

    mockWallet.registerBasename.mockResolvedValue({
      ...mockContract,
      wait: () => Promise.resolve(mockContract)
    });

    const input = {
      name: 'example'
    };

    const result = await registerBasenameAction.execute(mockWallet, input);

    expect(mockWallet.registerBasename).toHaveBeenCalledWith(input);
    expect(result).toContain('Registered Basename');
    expect(result).toContain(mockContract.transaction.transactionHash);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to register');
    mockWallet.registerBasename.mockRejectedValue(error);

    const input = {
      name: 'example'
    };

    const result = await registerBasenameAction.execute(mockWallet, input);

    expect(mockWallet.registerBasename).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to register basename');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {};

    const result = await registerBasenameAction.execute(mockWallet, input as any);

    expect(mockWallet.registerBasename).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 