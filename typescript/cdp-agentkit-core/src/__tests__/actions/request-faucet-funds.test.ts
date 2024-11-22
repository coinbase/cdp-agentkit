import { requestFaucetFundsAction } from '../../actions/request-faucet-funds';
import type { Wallet } from '../../types';

describe('requestFaucetFundsAction', () => {
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      faucet: jest.fn()
    } as any;
  });

  it('should request faucet funds successfully', async () => {
    const txHash = '0x123...';
    mockWallet.faucet.mockResolvedValue(txHash);

    const result = await requestFaucetFundsAction.execute(mockWallet, {});

    expect(mockWallet.faucet).toHaveBeenCalled();
    expect(result).toContain(txHash);
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