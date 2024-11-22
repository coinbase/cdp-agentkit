import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { mintNftAction } from '../../src/actions/mint-nft';
import { createMockWallet, createMockSmartContract } from '../helpers';

// Constants from Python tests
const MOCK_CONTRACT_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const MOCK_TOKEN_ID = "1";
const MOCK_TO_ADDRESS = "0xabcdef1234567890abcdef1234567890abcdef1234";
const MOCK_TX_HASH = "0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba";

describe('mintNftAction', () => {
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
    mockWallet.mintNft.mockResolvedValue(mockContract);
  });

  it('should mint NFT successfully', async () => {
    const input = {
      contractAddress: MOCK_CONTRACT_ADDRESS,
      tokenId: MOCK_TOKEN_ID,
      to: MOCK_TO_ADDRESS
    };

    const result = await mintNftAction.execute(mockWallet, input);

    expect(mockWallet.mintNft).toHaveBeenCalledWith(input);
    expect(result).toContain('Minted NFT from contract');
    expect(result).toContain(MOCK_CONTRACT_ADDRESS);
  });

  it('should handle optional parameters', async () => {
    const input = {
      contractAddress: MOCK_CONTRACT_ADDRESS
    };

    const result = await mintNftAction.execute(mockWallet, input);

    expect(mockWallet.mintNft).toHaveBeenCalledWith(input);
    expect(result).toContain('Minted NFT from contract');
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to mint');
    mockWallet.mintNft.mockRejectedValue(error);

    const input = {
      contractAddress: MOCK_CONTRACT_ADDRESS
    };

    const result = await mintNftAction.execute(mockWallet, input);

    expect(mockWallet.mintNft).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to mint NFT');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      // missing contractAddress
    };

    const result = await mintNftAction.execute(mockWallet, input as any);

    expect(mockWallet.mintNft).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 