import { deployTokenAction } from '../../src/actions';
import type { Wallet } from '../../src/types';

describe('deployTokenAction', () => {
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      networkId: 'base-sepolia',
      deployToken: jest.fn(),
    } as any;
  });

  it('should deploy token contract successfully', async () => {
    const mockContract = {
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      transaction: {
        transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
      },
      wait: function() {
        return Promise.resolve(this);
      }
    };

    mockWallet.deployToken.mockResolvedValue({
      ...mockContract,
      wait: () => Promise.resolve(mockContract)
    });

    const input = {
      name: 'Test Token',
      symbol: 'TEST',
      totalSupply: '1000000'
    };

    const result = await deployTokenAction.execute(mockWallet, input);

    expect(mockWallet.deployToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Deployed Token');
    expect(result).toContain(mockContract.transaction.transactionHash);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to deploy');
    mockWallet.deployToken.mockRejectedValue(error);

    const input = {
      name: 'Test Token',
      symbol: 'TEST',
      totalSupply: '1000000'
    };

    const result = await deployTokenAction.execute(mockWallet, input);

    expect(mockWallet.deployToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to deploy token contract');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      name: 'Test Token'
    };

    const result = await deployTokenAction.execute(mockWallet, input as any);

    expect(mockWallet.deployToken).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 