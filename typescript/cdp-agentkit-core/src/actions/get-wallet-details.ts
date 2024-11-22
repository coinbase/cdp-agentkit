import type { CdpAction, BaseActionInput } from './types';
import type { Wallet } from '../types';

const GET_WALLET_DETAILS_PROMPT = `
This tool will get details about the CDP MPC Wallet, including the default address and network.
It takes no inputs.
`;

export const getWalletDetailsAction: CdpAction<BaseActionInput> = {
  name: 'get_wallet_details',
  description: GET_WALLET_DETAILS_PROMPT,
  
  async execute(wallet: Wallet, _input: BaseActionInput): Promise<string> {
    try {
      const address = await wallet.getDefaultAddress();
      return `Wallet Address: ${address}\nNetwork: ${wallet.networkId}`;
    } catch (e) {
      return `Failed to get wallet details: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
}; 