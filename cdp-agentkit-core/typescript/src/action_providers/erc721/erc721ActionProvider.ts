import { z } from "zod";
import { ActionProvider } from "../action_provider";
import { Network, EvmWalletProvider } from "../../wallet_providers";
import { CreateAction } from "../action_decorator";
import { MintSchema, TransferSchema } from "./schemas";
import { ERC721_ABI } from "./constants";
import { encodeFunctionData } from "viem";

/**
 * Erc721ActionProvider is an action provider for Erc721 contract interactions.
 */
export class Erc721ActionProvider extends ActionProvider {
  constructor() {
    super("erc721", []);
  }

  /**
   * Checks if the Erc721 action provider supports the given network.
   *
   * @param network - The network to check.
   * @returns True if the Erc721 action provider supports the network, false otherwise.
   */
  supportsNetwork = (network: Network) => network.protocolFamily === "evm";

  /**
   * Mints an NFT (ERC-721) to a specified destination address onchain.
   *
   * @param wallet - The wallet to mint the NFT from.
   * @param args - The input arguments for the action.
   * @returns A message containing the NFT mint details.
   */
  @CreateAction({
    name: "mint",
    description: `
This tool will mint an NFT (ERC-721) to a specified destination address onchain via a contract invocation. 
It takes the contract address of the NFT onchain and the destination address onchain that will receive the NFT as inputs. 
Do not use the contract address as the destination address. If you are unsure of the destination address, please ask the user before proceeding.
`,
    schema: MintSchema,
  })
  async mint(walletProvider: EvmWalletProvider, args: z.infer<typeof MintSchema>): Promise<string> {
    try {
      const data = encodeFunctionData({
        abi: ERC721_ABI,
        functionName: "mint",
        args: [args.destination, 1],
      });

      const hash = await walletProvider.sendTransaction({
        to: args.contractAddress as `0x${string}`,
        data,
      });

      await walletProvider.waitForTransactionReceipt(hash);

      return `Successfully minted NFT ${args.contractAddress} to ${args.destination}`;
    } catch (error) {
      return `Error minting NFT ${args.contractAddress} to ${args.destination}: ${error}`;
    }
  }

  /**
   * Transfers an NFT (ERC721 token) to a destination address.
   *
   * @param args - The input arguments for the action.
   * @returns A message containing the transfer details.
   */
  @CreateAction({
    name: "transfer",
    description: `
This tool will transfer an NFT (ERC721 token) from the wallet to another onchain address.

It takes the following inputs:
- contractAddress: The NFT contract address
- tokenId: The ID of the specific NFT to transfer
- destination: Onchain address to send the NFT

Important notes:
- Ensure you have ownership of the NFT before attempting transfer
- Ensure there is sufficient native token balance for gas fees
- The wallet must either own the NFT or have approval to transfer it
`,
    schema: TransferSchema,
  })
  async transfer(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof TransferSchema>,
  ): Promise<string> {
    try {
      const fromAddress = args.fromAddress ?? walletProvider.getAddress();

      const data = encodeFunctionData({
        abi: ERC721_ABI,
        functionName: "transferFrom",
        args: [args.fromAddress, args.destination, args.tokenId],
      });

      const hash = await walletProvider.sendTransaction({
        to: args.contractAddress as `0x${string}`,
        data,
      });

      await walletProvider.waitForTransactionReceipt(hash);

      return `Successfully transferred NFT ${args.contractAddress} with tokenId ${args.tokenId} to ${args.destination}`;
    } catch (error) {
      return `Error transferring NFT ${args.contractAddress} with tokenId ${args.tokenId} to ${args.destination}: ${error}`;
    }
  }
}

export const erc721ActionProvider = () => new Erc721ActionProvider();
