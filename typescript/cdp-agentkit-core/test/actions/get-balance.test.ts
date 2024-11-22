import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { getBalanceAction } from '../../src/actions/get-balance';
import { createMockWallet } from '../helpers';

// Constants from Python tests
const MOCK_ASSET_ID = "eth";
const MOCK_BALANCE = "1.5";

describe('getBalanceAction', () => {
  const mockWallet = createMockWallet();

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.getBalance.mockResolvedValue(MOCK_BALANCE);
  });

  it('should get balance successfully', async () => {
    const input = {
      assetId: MOCK_ASSET_ID
    };

    const result = await getBalanceAction.execute(mockWallet, input);

    expect(mockWallet.getBalance).toHaveBeenCalledWith(MOCK_ASSET_ID);
    expect(result).toContain(MOCK_BALANCE);
    expect(result).toContain(MOCK_ASSET_ID);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to get balance');
    mockWallet.getBalance.mockRejectedValue(error);

    const input = {
      assetId: MOCK_ASSET_ID
    };

    const result = await getBalanceAction.execute(mockWallet, input);

    expect(mockWallet.getBalance).toHaveBeenCalledWith(MOCK_ASSET_ID);
    expect(result).toContain('Failed to get balance');
    expect(result).toContain(error.message);
  });

  it('should validate required inputs', async () => {
    const input = {};

    const result = await getBalanceAction.execute(mockWallet, input as any);

    expect(mockWallet.getBalance).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 