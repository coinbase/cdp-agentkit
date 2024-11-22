import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { deployNftAction } from '../../src/actions/deploy-nft';
import { createMockWallet, createMockSmartContract } from '../helpers';

describe('deployNftAction', () => {
  const mockWallet = createMockWallet();
  const mockContract = createMockSmartContract();

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.deployNft.mockResolvedValue(mockContract);
  });

  it('should deploy NFT contract successfully', async () => {
    const input = {
      name: 'Test NFT',
      symbol: 'TEST',
      baseUri: 'https://api.example.com/nft/'
    };

    const result = await deployNftAction.execute(mockWallet, input);

    expect(mockWallet.deployNft).toHaveBeenCalledWith(input);
    expect(result).toContain('Successfully deployed NFT contract');
    expect(result).toContain(mockContract.contractAddress);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to deploy');
    mockWallet.deployNft.mockRejectedValue(error);

    const input = {
      name: 'Test NFT',
      symbol: 'TEST',
      baseUri: 'https://api.example.com/nft/'
    };

    const result = await deployNftAction.execute(mockWallet, input);

    expect(mockWallet.deployNft).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to deploy NFT contract');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      name: 'Test NFT',
      // missing symbol and baseUri
    };

    const result = await deployNftAction.execute(mockWallet, input as any);

    expect(mockWallet.deployNft).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 