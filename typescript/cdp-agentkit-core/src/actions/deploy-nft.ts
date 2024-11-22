import type { CdpAction, BaseActionInput } from './types';
import type { Wallet } from '../types';

export interface DeployNftInput extends BaseActionInput {
  readonly name: string;
  readonly symbol: string;
  readonly baseUri: string;
}

const DEPLOY_NFT_PROMPT = `
This tool will deploy an NFT (ERC-721) collection onchain via a contract deployment. 
It takes the name of the collection, symbol, and base URI for the NFT metadata as inputs.
`;

export const deployNftAction: CdpAction<DeployNftInput> = {
  name: 'deploy_nft',
  description: DEPLOY_NFT_PROMPT,
  
  async execute(wallet: Wallet, input: DeployNftInput): Promise<string> {
    const { name, symbol, baseUri } = input;
    
    if (!name || !symbol || !baseUri) {
      return 'Missing required fields: name, symbol, and baseUri are required';
    }
    
    try {
      const contract = await (await wallet.deployNft({
        name,
        symbol,
        baseUri,
      })).wait();

      return `Deployed NFT Collection ${name} to address ${contract.contractAddress} on network ${wallet.networkId}.\n` +
        `Transaction hash for the deployment: ${contract.transaction.transactionHash}\n` +
        `Transaction link for the deployment: ${contract.transaction.transactionLink}`;
    } catch (e) {
      return `Failed to deploy NFT contract: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
}; 