import type { CdpAction, BaseActionInput } from '../types';
import type { Wallet } from '../../types';

export interface WowSellTokenInput extends BaseActionInput {
  readonly tokenAddress: string;
  readonly amountIn: string;
}

const WOW_SELL_TOKEN_PROMPT = `
This tool will sell a WOW token for ETH. It takes the token address and the amount of tokens to sell as inputs.
The amount should be in token units (e.g. "100" for 100 tokens).
`;

export const wowSellTokenAction: CdpAction<WowSellTokenInput> = {
  name: 'wow_sell_token',
  description: WOW_SELL_TOKEN_PROMPT,
  
  async execute(wallet: Wallet, input: WowSellTokenInput): Promise<string> {
    const { tokenAddress, amountIn } = input;
    
    if (!tokenAddress || !amountIn) {
      return 'Missing required fields: tokenAddress and amountIn are required';
    }
    
    try {
      const trade = await (await wallet.wowSellToken({
        tokenAddress,
        amountIn,
      })).wait();

      return `Sold ${amountIn} WOW tokens at ${tokenAddress} for ETH.\n` +
        `Transaction hash: ${trade.transaction.transactionHash}\n` +
        `Transaction link: ${trade.transaction.transactionLink}`;
    } catch (e) {
      return `Failed to sell WOW token: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
}; 