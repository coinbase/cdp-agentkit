import type { CdpAction, BaseActionInput } from './types';
import type { Wallet } from '../types';

/**
 * Input arguments for transfer action
 * @property amount - The amount of the asset to transfer, e.g. '15', '0.000001'
 * @property assetId - The asset ID to transfer, e.g. 'eth', '0x036CbD53842c5426634e7929541eC2318f3dCF7e'
 * @property destination - The destination address, ENS name, or Basename, e.g. '0x58dB...', 'example.eth', 'example.base.eth'
 * @property gasless - Whether to do a gasless transfer (available on base-sepolia and base-mainnet for USDC only)
 */
export interface TransferInput extends BaseActionInput {
  readonly amount: string;
  readonly assetId: string;
  readonly destination: string;
  readonly gasless?: boolean;
}

const TRANSFER_PROMPT = `
This tool will transfer an asset from the wallet to another onchain address. It takes the amount, 
the asset ID to transfer, the destination to send the funds (either an onchain address, an ENS 
'example.eth', or Basename 'example.base.eth'), and whether to do a gasless transfer as inputs. 

The gasless option is available on 'base-sepolia' and 'base-mainnet' networks for 'usdc' asset only. 
Always use the gasless option when it is available. Always use the asset ID 'usdc' when attempting 
to transfer USDC. Always ensure that you have enough balance of the input asset ID to complete the transfer.
`;

export const transferAction: CdpAction<TransferInput> = {
  name: 'transfer',
  description: TRANSFER_PROMPT,
  
  async execute(wallet: Wallet, input: TransferInput): Promise<string> {
    const { amount, assetId, destination: to, gasless = false } = input;
    
    try {
      const transfer = await (await wallet.transfer({
        amount,
        assetId,
        to,
        gasless,
      })).wait();

      return `Transferred ${amount} of ${assetId} to ${to}.\nTransaction hash for the transfer: ${transfer.transactionHash}\nTransaction link for the transfer: ${transfer.transactionLink}`;
    } catch (e) {
      return `Error transferring the asset: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
}; 