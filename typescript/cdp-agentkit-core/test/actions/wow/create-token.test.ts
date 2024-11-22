import { wowCreateTokenAction } from '../../../src/actions';
import { GENERIC_TOKEN_METADATA_URI } from '../../../src/actions/wow/constants';
import type { Wallet } from '../../../src/types';

describe('wowCreateTokenAction', () => {
  let mockWallet: jest.Mocked<Wallet>;

  beforeEach(() => {
    mockWallet = {
      wowCreateToken: jest.fn(),
    } as any;
  });

  it('should create WOW token successfully', async () => {
    const mockContract = {
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      transaction: {
        transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
      },
      wait: function() {
        return Promise.resolve(this);
      }
    };

    mockWallet.wowCreateToken.mockResolvedValue({
      ...mockContract,
      wait: () => Promise.resolve(mockContract)
    });

    const input = {
      name: 'Test WOW Token',
      symbol: 'TWOW',
      totalSupply: '1000000',
      tokenUri: GENERIC_TOKEN_METADATA_URI
    };

    const result = await wowCreateTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowCreateToken).toHaveBeenCalledWith(input);
    expect(result).toContain('Created WOW token');
    expect(result).toContain(mockContract.transaction.transactionHash);
  });

  it('should handle optional tokenUri', async () => {
    const mockContract = {
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      transaction: {
        transactionHash: '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba',
        transactionLink: 'https://basescan.org/tx/0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba'
      },
      wait: function() {
        return Promise.resolve(this);
      }
    };

    mockWallet.wowCreateToken.mockResolvedValue({
      ...mockContract,
      wait: () => Promise.resolve(mockContract)
    });

    const input = {
      name: 'Test WOW Token',
      symbol: 'TWOW',
      totalSupply: '1000000'
    };

    const result = await wowCreateTokenAction.execute(mockWallet, input);

    expect(mockWallet.wowCreateToken).toHaveBeenCalledWith({
      ...input,
      tokenUri: GENERIC_TOKEN_METADATA_URI
    });
    expect(result).toContain('Created WOW token');
    expect(result).toContain(mockContract.transaction.transactionHash);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Failed to create token');
    mockWallet.wowCreateToken.mockRejectedValue(error);

    const input = {
      name: 'Test WOW Token',
      symbol: 'TWOW',
      totalSupply: '1000000'
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
      name: 'Test WOW Token'
    };

    const result = await wowCreateTokenAction.execute(mockWallet, input as any);

    expect(mockWallet.wowCreateToken).not.toHaveBeenCalled();
    expect(result).toContain('Missing required fields');
  });
}); 