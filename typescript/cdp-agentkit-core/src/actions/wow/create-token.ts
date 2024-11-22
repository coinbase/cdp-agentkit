import { GENERIC_TOKEN_METADATA_URI } from './constants';
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
    
    if (!name || !symbol || !totalSupply) {
      return 'Missing required fields: name, symbol, and totalSupply are required';
    }
    
    try {
      const contract = await (await wallet.wowCreateToken({
        name,
        symbol,
        totalSupply,
        tokenUri: tokenUri || GENERIC_TOKEN_METADATA_URI
      })).wait();

      return `Created WOW token ${name} (${symbol}) at ${contract.contractAddress} with total supply ${totalSupply}.\n` +
        `Transaction hash: ${contract.transaction.transactionHash}\n` +
        `Transaction link: ${contract.transaction.transactionLink}`;
    } catch (e) {
      return `Failed to create WOW token: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
}; 