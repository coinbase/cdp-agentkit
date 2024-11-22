import type { CdpAction, BaseActionInput } from './types';
import type { Wallet } from '../types';

/**
 * Input arguments for deploy token action
 * @property name - The name of the token to deploy, e.g. 'My Token'
 * @property symbol - The symbol of the token to deploy, e.g. 'MTK'
 * @property totalSupply - The total supply of the token to mint, e.g. '1000000'
 */
export interface DeployTokenInput extends BaseActionInput {
  name: string;
  symbol: string;
  totalSupply: string;
}

const DEPLOY_TOKEN_PROMPT = `
This tool will deploy an ERC-20 token contract onchain from the wallet. It takes the name of the token,
the symbol of the token, and the total supply to mint as inputs. The total supply will be minted to
the deploying wallet's address.
`;

export const deployTokenAction: CdpAction<DeployTokenInput> = {
  name: 'deploy_token',
  description: DEPLOY_TOKEN_PROMPT,
  
  async execute(wallet: Wallet, input: DeployTokenInput): Promise<string> {
    const { name, symbol, totalSupply } = input;
    
    try {
      const contract = await (await wallet.deployToken({
        name,
        symbol,
        totalSupply,
      })).wait();

      return `Deployed Token ${name} (${symbol}) with total supply ${totalSupply} to address ${contract.contractAddress} on network ${wallet.networkId}.\nTransaction hash for the deployment: ${contract.transaction.transactionHash}\nTransaction link for the deployment: ${contract.transaction.transactionLink}`;
    } catch (e) {
      return `Error deploying token: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
}; 