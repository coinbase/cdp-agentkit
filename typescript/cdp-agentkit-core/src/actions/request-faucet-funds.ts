import type { CdpAction, BaseActionInput } from './types';
import type { Wallet } from '../types';

export interface RequestFaucetFundsInput extends BaseActionInput {}

export const requestFaucetFundsAction: CdpAction<RequestFaucetFundsInput> = {
  name: 'request_faucet_funds',
  description: 'This tool will request testnet funds from the faucet for the wallet. It takes no inputs.',
  execute: async (wallet: Wallet): Promise<string> => {
    try {
      const faucetTx = await wallet.faucet();
      return `Successfully requested faucet funds. Transaction: ${faucetTx}`;
    } catch (error) {
      console.error('Error requesting faucet funds:', error);
      return `Failed to request faucet funds: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
}; 