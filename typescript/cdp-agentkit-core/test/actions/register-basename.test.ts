import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { registerBasenameAction } from '../../src/actions/register-basename';
import { createMockWallet, createMockSmartContract } from '../helpers';

// Constants from Python tests
const MOCK_NAME = "example";
const MOCK_CONTRACT_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const MOCK_TX_HASH = "0xabcd1234567890abcdef1234567890abcdef1234567890abcdef1234567890";

describe('registerBasenameAction', () => {
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
    mockWallet.registerBasename.mockResolvedValue(mockContract);
  });

  it('should register basename successfully', async () => {
    const input = {
      name: MOCK_NAME
    };

    const result = await registerBasenameAction.execute(mockWallet, input);

    expect(mockWallet.registerBasename).toHaveBeenCalledWith(input);
    expect(result).toContain('Registered Basename');
    expect(result).toContain(MOCK_CONTRACT_ADDRESS);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to register');
    mockWallet.registerBasename.mockRejectedValue(error);

    const input = {
      name: MOCK_NAME
    };

    const result = await registerBasenameAction.execute(mockWallet, input);

    expect(mockWallet.registerBasename).toHaveBeenCalledWith(input);
    expect(result).toContain('Failed to register basename');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {
      // missing name
    };

    const result = await registerBasenameAction.execute(mockWallet, input as any);

    expect(mockWallet.registerBasename).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 