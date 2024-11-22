import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { wowCreateTokenAction } from '../../../src/actions/wow/create-token';
import { createMockWallet, createMockSmartContract } from '../../helpers';
import { GENERIC_TOKEN_METADATA_URI } from '../../../src/actions/wow/constants';

// Constants from Python tests
const MOCK_NAME = "Test WOW Token";
const MOCK_SYMBOL = "TWOW";
const MOCK_TOTAL_SUPPLY = "1000000";
const MOCK_CONTRACT_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const MOCK_TX_HASH = "0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

describe('wowCreateTokenAction', () => {
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
    mockWallet.wowCreateToken.mockResolvedValue(mockContract);
  });

  it('should create WOW token successfully', async () => {
    const input = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      totalSupply: MOCK_TOTAL_SUPPLY,
      tokenUri: GENERIC_TOKEN_METADATA_URI
    };

    const result = await wowCreateTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowCreateToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Created WOW token');
    expect(result).toContain(mockContract.contractAddress);
  });

  it('should handle optional tokenUri', async () => {
    const input = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      totalSupply: MOCK_TOTAL_SUPPLY
    };

    const result = await wowCreateTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowCreateToken).toHaveBeenCalledWith({
      ...input,
      tokenUri: GENERIC_TOKEN_METADATA_URI
    });
    expect(result).toContain('Created WOW token');
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to create token');
    mockWallet.wowCreateToken.mockRejectedValue(error);

    const input = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      totalSupply: MOCK_TOTAL_SUPPLY
    };

    const result = await wowCreateTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowCreateToken).toHaveBeenCalledWith({
      ...input,
      tokenUri: GENERIC_TOKEN_METADATA_URI
    });
    expect(result).toContain('Failed to create WOW token');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      name: MOCK_NAME,
      // missing symbol and totalSupply
    };

    const result = await wowCreateTokenAction.execute(mockWallet, input as any);

    expect(mockWallet.wowCreateToken).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 