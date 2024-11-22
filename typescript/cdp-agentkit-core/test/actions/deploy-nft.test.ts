import { deployNftAction } from '../../src/actions';
import type { Wallet } from '../../src/types';

describe('deployNftAction', () => {
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      networkId: 'test-network',
      deployNft: jest.fn(),
    } as any;
  });

  it('should deploy NFT collection successfully', async () => {
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

    mockWallet.deployNft.mockResolvedValue({
      ...mockContract,
      wait: () => Promise.resolve(mockContract)
    });

    const input = {
      name: 'Test NFT Collection',
      symbol: 'TNFT',
      baseUri: 'ipfs://test/'
    };

    const result = await deployNftAction.execute(mockWallet, input);

    expect(mockWallet.deployNft).toHaveBeenCalledWith(input);
    expect(result).toContain('Deployed NFT Collection');
    expect(result).toContain(mockContract.contractAddress);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to deploy');
    mockWallet.deployNft.mockRejectedValue(error);

    const input = {
      name: 'Test NFT Collection',
      symbol: 'TNFT',
      baseUri: 'ipfs://test/'
    };

    const result = await deployNftAction.execute(mockWallet, input);

    expect(mockWallet.deployNft).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to deploy NFT contract');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      name: 'Test NFT Collection'
    };

    const result = await deployNftAction.execute(mockWallet, input as any);

    expect(mockWallet.deployNft).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 