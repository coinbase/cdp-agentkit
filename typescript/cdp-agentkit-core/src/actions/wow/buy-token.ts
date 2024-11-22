import type { CdpAction, BaseActionInput } from '../types';
import type { Wallet } from '../../types';

export interface WowBuyTokenInput extends BaseActionInput {
  readonly tokenAddress: string;
  readonly amountInEth: string;
}

const WOW_BUY_TOKEN_PROMPT = `
This tool will buy a WOW token with ETH. It takes the token address and the amount of ETH to spend as inputs.
The amount should be in ETH units (e.g. "0.1" for 0.1 ETH).
`;

export const wowBuyTokenAction: CdpAction<WowBuyTokenInput> = {
  name: 'wow_buy_token',
  description: WOW_BUY_TOKEN_PROMPT,
  
  async execute(wallet: Wallet, input: WowBuyTokenInput): Promise<string> {
    const { tokenAddress, amountInEth } = input;
    
    const trade = await (await wallet.wowBuyToken({
      tokenAddress,
      amountInEth,
    })).wait();

    return `Bought WOW token at ${tokenAddress} with ${amountInEth} ETH.\nTransaction hash: ${trade.transaction.transactionHash}\nTransaction link: ${trade.transaction.transactionLink}`;
  }
}; 