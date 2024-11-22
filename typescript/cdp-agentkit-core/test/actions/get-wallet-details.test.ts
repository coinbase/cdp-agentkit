import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { getWalletDetailsAction } from '../../src/actions/get-wallet-details';
import { createMockWallet } from '../helpers';

// Constants from Python tests
const MOCK_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678";
const MOCK_NETWORK_ID = "base-sepolia";

describe('getWalletDetailsAction', () => {
  const mockWallet = createMockWallet({
    networkId: MOCK_NETWORK_ID
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.getDefaultAddress.mockResolvedValue(MOCK_ADDRESS);
  });

  it('should get wallet details successfully', async () => {
    const result = await getWalletDetailsAction.execute(mockWallet, {});

    expect(mockWallet.getDefaultAddress).toHaveBeenCalled();
    expect(result).toContain(MOCK_ADDRESS);
    expect(result).toContain(MOCK_NETWORK_ID);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to get details');
    mockWallet.getDefaultAddress.mockRejectedValue(error);

    const result = await getWalletDetailsAction.execute(mockWallet, {});

    expect(mockWallet.getDefaultAddress).toHaveBeenCalled();
    expect(result).toContain('Failed to get wallet details');
    expect(result).toContain(error.message);
  });
}); 