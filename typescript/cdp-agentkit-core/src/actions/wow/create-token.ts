import type { CdpAction, BaseActionInput } from '../types';
import type { Wallet } from '../../types';

export interface WowCreateTokenInput extends BaseActionInput {
  readonly name: string;
  readonly symbol: string;
  readonly totalSupply: string;
  readonly tokenUri?: string;
}

const WOW_CREATE_TOKEN_PROMPT = `
This tool will create a new WOW token with a bonding curve. It takes the token name, symbol, 
total supply, and optional token URI as inputs. The total supply should be in token units 
(e.g. "1000000" for 1 million tokens).
`;

export const wowCreateTokenAction: CdpAction<WowCreateTokenInput> = {
  name: 'wow_create_token',
  description: WOW_CREATE_TOKEN_PROMPT,
  
  async execute(wallet: Wallet, input: WowCreateTokenInput): Promise<string> {
    const { name, symbol, totalSupply, tokenUri } = input;
    
    const contract = await (await wallet.wowCreateToken({
      name,
      symbol,
      totalSupply,
      tokenUri,
    })).wait();

    return `Created WOW token ${name} (${symbol}) at ${contract.contractAddress} with total supply ${totalSupply}.\nTransaction hash: ${contract.transaction.transactionHash}\nTransaction link: ${contract.transaction.transactionLink}`;
  }
}; 