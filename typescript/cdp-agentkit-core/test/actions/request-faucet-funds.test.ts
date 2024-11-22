import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { requestFaucetFundsAction } from '../../src/actions/request-faucet-funds';
import { createMockWallet } from '../helpers';

// Constants from Python tests
const MOCK_TX_HASH = "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";

describe('requestFaucetFundsAction', () => {
  const mockWallet = createMockWallet();

  beforeEach(() => {
    jest.clearAllMocks();
    mockWallet.faucet.mockResolvedValue(MOCK_TX_HASH);
  });

  it('should request faucet funds successfully', async () => {
    const result = await requestFaucetFundsAction.execute(mockWallet, {});

    expect(mockWallet.faucet).toHaveBeenCalled();
    expect(result).toContain('Successfully requested faucet funds');
    expect(result).toContain(MOCK_TX_HASH);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Faucet error');
    mockWallet.faucet.mockRejectedValue(error);

    const result = await requestFaucetFundsAction.execute(mockWallet, {});

    expect(mockWallet.faucet).toHaveBeenCalled();
    expect(result).toContain('Failed to request faucet funds');
    expect(result).toContain(error.message);
  });
}); 