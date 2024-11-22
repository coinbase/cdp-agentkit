import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { deployNftAction } from '../../src/actions/deploy-nft';
import { createMockWallet, createMockSmartContract } from '../helpers';

// Constants from Python tests
const MOCK_NAME = "Test NFT Collection";
const MOCK_SYMBOL = "TEST";
const MOCK_BASE_URI = "https://api.example.com/nft/";
const MOCK_CONTRACT_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const MOCK_TX_HASH = "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

describe('deployNftAction', () => {
  const mockWallet = createMockWallet();
  const mockContract = createMockSmartContract({
    contractAddress: MOCK_CONTRACT_ADDRESS,
    transaction: {
      transactionHash: MOCK_TX_HASH,
      transactionLink: `https://basescan.org/tx/${MOCK_TX_HASH}`
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.deployNft.mockResolvedValue(mockContract);
  });

  it('should deploy NFT contract successfully', async () => {
    const input = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      baseUri: MOCK_BASE_URI
    };

    const result = await deployNftAction.execute(mockWallet, input);

    expect(mockWallet.deployNft).toHaveBeenCalledWith(input);
    expect(result).toContain('Deployed NFT Collection');
    expect(result).toContain(MOCK_CONTRACT_ADDRESS);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to deploy');
    mockWallet.deployNft.mockRejectedValue(error);

    const input = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      baseUri: MOCK_BASE_URI
    };

    const result = await deployNftAction.execute(mockWallet, input);

    expect(mockWallet.deployNft).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to deploy NFT contract');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      name: MOCK_NAME,
      // missing symbol and baseUri
    };

    const result = await deployNftAction.execute(mockWallet, input as any);

    expect(mockWallet.deployNft).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 