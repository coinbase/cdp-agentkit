import type { CdpAction, BaseActionInput } from './types';
import type { Wallet } from '../types';

/**
 * Input arguments for get balance action
 * @property assetId - The asset ID to get the balance for, e.g. 'eth', 'usdc', or contract address
 */
export interface GetBalanceInput extends BaseActionInput {
  readonly assetId: string;
}

const GET_BALANCE_PROMPT = `
This tool will get the balance of a specific asset in the wallet.
It takes the asset ID as input (e.g. 'eth', 'usdc', or a contract address).
`;

export const getBalanceAction: CdpAction<GetBalanceInput> = {
  name: 'get_balance',
  description: GET_BALANCE_PROMPT,
  
  async execute(wallet: Wallet, input: GetBalanceInput): Promise<string> {
    const { assetId } = input;
    
    try {
      const balance = await wallet.getBalance(assetId);
      return `Balance of ${assetId}: ${balance}`;
    } catch (e) {
      return `Error getting balance: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
}; 