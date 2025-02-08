import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { Network } from "../../network";
import { CreateAction } from "../actionDecorator";
import { GetBalanceSchema, TransferSchema, ApproveSchema, AllowanceSchema } from "./schemas";
import { abi } from "./constants";
import { encodeFunctionData, Hex } from "viem";
import { EvmWalletProvider } from "../../wallet-providers";

/**
 * ERC20ActionProvider is an action provider for ERC20 tokens.
 */
export class ERC20ActionProvider extends ActionProvider<EvmWalletProvider> {
  /**
   * Constructor for the ERC20ActionProvider.
   */
  constructor() {
    super("erc20", []);
  }

  /**
   * Gets the balance of an ERC20 token.
   *
   * @param walletProvider - The wallet provider to get the balance from.
   * @param args - The input arguments for the action.
   * @returns A message containing the balance.
   */
  @CreateAction({
    name: "get_balance",
    description: `
    This tool will get the balance of an ERC20 asset in the wallet. It takes the contract address as input.
    `,
    schema: GetBalanceSchema,
  })
  async getBalance(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof GetBalanceSchema>,
  ): Promise<string> {
    try {
      const balance = await walletProvider.readContract({
        address: args.contractAddress as Hex,
        abi,
        functionName: "balanceOf",
        args: [walletProvider.getAddress()],
      });

      return `Balance of ${args.contractAddress} is ${balance}`;
    } catch (error) {
      return `Error getting balance: ${error}`;
    }
  }

  /**
   * Transfers a specified amount of an ERC20 token to a destination onchain.
   *
   * @param walletProvider - The wallet provider to transfer the asset from.
   * @param args - The input arguments for the action.
   * @returns A message containing the transfer details.
   */
  @CreateAction({
    name: "transfer",
    description: `
    This tool will transfer an ERC20 token from the wallet to another onchain address.

It takes the following inputs:
- amount: The amount to transfer
- contractAddress: The contract address of the token to transfer
- destination: Where to send the funds (can be an onchain address, ENS 'example.eth', or Basename 'example.base.eth')

Important notes:
- Ensure sufficient balance of the input asset before transferring
- When sending native assets (e.g. 'eth' on base-mainnet), ensure there is sufficient balance for the transfer itself AND the gas cost of this transfer
    `,
    schema: TransferSchema,
  })
  async transfer(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof TransferSchema>,
  ): Promise<string> {
    try {
      const hash = await walletProvider.sendTransaction({
        to: args.contractAddress as Hex,
        data: encodeFunctionData({
          abi,
          functionName: "transfer",
          args: [args.destination as Hex, BigInt(args.amount)],
        }),
      });

      await walletProvider.waitForTransactionReceipt(hash);

      return `Transferred ${args.amount} of ${args.contractAddress} to ${
        args.destination
      }.\nTransaction hash for the transfer: ${hash}`;
    } catch (error) {
      return `Error transferring the asset: ${error}`;
    }
  }
  /**
   * Approves a spender to transfer a specified amount of tokens.
   *
   * @param walletProvider - The wallet provider to approve from.
   * @param args - The input arguments for the action.
   * @returns A message containing the approval details.
   */
  @CreateAction({
    name: "approve",
    description: `
  This tool will approve a spender to transfer ERC20 tokens from the wallet.

  It takes the following inputs:
  - amount: The amount to approve
  - contractAddress: The contract address of the token
  - spender: The address to approve (can be a contract or wallet address)
  
  Important notes:
  - This will overwrite any existing allowance
  - Ensure you trust the spender address
  `,
    schema: ApproveSchema,
  })
  async approve(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof ApproveSchema>,
  ): Promise<string> {
    try {
      const hash = await walletProvider.sendTransaction({
        to: args.contractAddress as Hex,
        data: encodeFunctionData({
          abi,
          functionName: "approve",
          args: [args.spender as Hex, BigInt(args.amount)],
        }),
      });

      await walletProvider.waitForTransactionReceipt(hash);

      return `Approved ${args.amount} of ${args.contractAddress} for spender ${args.spender}.\nTransaction hash: ${hash}`;
    } catch (error) {
      return `Error approving tokens: ${error}`;
    }
  }
  /**
   * Checks the allowance for a spender of an ERC20 token.
   *
   * @param walletProvider - The wallet provider to check the allowance from.
   * @param args - The input arguments containing contractAddress and spender.
   * @returns A message containing the allowance amount for the spender.
   * @throws Will return an error message if the contract call fails.
   */
  @CreateAction({
    name: "get_allowance",
    description: "Gets the amount of tokens the spender is allowed to spend on behalf of the owner",
    schema: AllowanceSchema,
  })
  async getAllowance(
    walletProvider: EvmWalletProvider,
    args: z.infer<typeof AllowanceSchema>,
  ): Promise<string> {
    try {
      const allowance = await walletProvider.readContract({
        address: args.contractAddress as Hex,
        abi,
        functionName: "allowance",
        args: [walletProvider.getAddress(), args.spender as Hex],
      });

      return `Allowance for ${args.spender} is ${allowance} tokens`;
    } catch (error) {
      return `Error checking allowance: ${error}`;
    }
  }

  /**
   * Checks if the ERC20 action provider supports the given network.
   *
   * @param _ - The network to check.
   * @returns True if the ERC20 action provider supports the network, false otherwise.
   */
  supportsNetwork = (_: Network) => true;
}

export const erc20ActionProvider = () => new ERC20ActionProvider();
