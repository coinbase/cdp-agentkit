import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { deployTokenAction } from '../../src/actions/deploy-token';
import { createMockWallet, createMockSmartContract } from '../helpers';

// Constants from Python tests
const MOCK_NAME = "Test Token";
const MOCK_SYMBOL = "TEST";
const MOCK_TOTAL_SUPPLY = "1000000";

describe('deployTokenAction', () => {
  const mockWallet = createMockWallet();
  const mockContract = createMockSmartContract({
    contractAddress: '0x1234567890abcdef...',
    transaction: {
      transactionHash: '0xabcd1234567890...',
      transactionLink: 'https://basescan.org/tx/0xabcd1234567890...'
    }
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.deployToken.mockResolvedValue(mockContract);
  });

  it('should deploy token contract successfully', async () => {
    const input = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      totalSupply: MOCK_TOTAL_SUPPLY
    };

    const result = await deployTokenAction.execute(mockWallet, input);

    expect(mockWallet.deployToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Deployed token');
    expect(result).toContain(mockContract.contractAddress);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to deploy');
    mockWallet.deployToken.mockRejectedValue(error);

    const input = {
      name: MOCK_NAME,
      symbol: MOCK_SYMBOL,
      totalSupply: MOCK_TOTAL_SUPPLY
    };

    const result = await deployTokenAction.execute(mockWallet, input);

    expect(mockWallet.deployToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to deploy token contract');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      name: MOCK_NAME,
      // missing symbol and totalSupply
    };

    const result = await deployTokenAction.execute(mockWallet, input as any);

    expect(mockWallet.deployToken).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 