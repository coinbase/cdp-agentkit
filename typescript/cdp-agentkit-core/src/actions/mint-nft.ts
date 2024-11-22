import type { CdpAction, BaseActionInput } from './types';
import type { Wallet } from '../types';

/**
 * Input arguments for mint NFT action
 * @property contractAddress - The address of the NFT contract to mint from
 * @property tokenId - The token ID to mint (optional)
 * @property to - The address to mint the NFT to (optional, defaults to wallet's address)
 */
export interface MintNftInput extends BaseActionInput {
  readonly contractAddress: string;
  readonly tokenId?: string;
  readonly to?: string;
}

const MINT_NFT_PROMPT = `
This tool will mint an NFT from an existing NFT collection contract.
It takes the contract address, optional token ID, and optional recipient address as inputs.
If no recipient is specified, it will mint to the wallet's default address.
`;

export const mintNftAction: CdpAction<MintNftInput> = {
  name: 'mint_nft',
  description: MINT_NFT_PROMPT,
  
  async execute(wallet: Wallet, input: MintNftInput): Promise<string> {
    const { contractAddress, tokenId, to } = input;
    
    try {
      const contract = await (await wallet.mintNft({
        contractAddress,
        tokenId,
        to,
      })).wait();

      return `Minted NFT from contract ${contractAddress}.\nTransaction hash: ${contract.transaction.transactionHash}\nTransaction link: ${contract.transaction.transactionLink}`;
    } catch (e) {
      return `Error minting NFT: ${e instanceof Error ? e.message : String(e)}`;
    }
  }
}; 