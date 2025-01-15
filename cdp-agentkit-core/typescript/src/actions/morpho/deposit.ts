import { Asset, Wallet } from "@coinbase/coinbase-sdk";
import { z } from "zod";
import { Decimal } from "decimal.js";

import { CdpAction } from "../cdp/cdp_action";

import { METAMORPHO_ABI } from "./constants";
import { approve } from "./utils";

const DEPOSIT_PROMPT = `
This tool allows depositing assets into a Morpho Vault. It takes:

- vault_address: The address of the Morpho Vault to deposit to
- assets: The amount of assets to deposit in whole units
  Examples for WETH:
  - 1 WETH
  - 0.1 WETH
  - 0.01 WETH
- receiver: The address to receive the shares
- tokenAddress: The address of the token to approve
`;

/**
 * Input schema for Morpho Vault deposit action
 */
export const MorphoDepositInput = z.object({
  vaultAddress: z.string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
    .describe("The address of the Morpho Vault to deposit to"),
  assets: z.string()
    .regex(/^\d+$/, "Must be a valid number string")
    .describe("The amount of assets to deposit in native units"),
  receiver: z.string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
    .describe("The address to receive the shares"),
  tokenAddress: z.string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
    .describe("The address of the token to approve")
}).describe("Input schema for Morpho Vault deposit action");

/**
 * Deposits assets into a Morpho Vault
 * @param Wallet - The wallet instance to execute the transaction
 * @param args - The input arguments for the action
 * @returns A success message with transaction details or an error message
 */
export async function depositToMorpho(
  wallet: Wallet,
  args: z.infer<typeof MorphoDepositInput>
): Promise<string> {
    if (Number(args.assets) <= 0) {
        return "Error: Assets amount must be greater than 0";
    }

    try {
        const tokenAsset = await Asset.fetch(wallet.getNetworkId(), args.tokenAddress);
        
        const atomicAssets = tokenAsset.toAtomicAmount(new Decimal(args.assets));

        const approvalResult = await approve(wallet, args.tokenAddress, args.vaultAddress, atomicAssets);
        if (approvalResult.startsWith("Error")) {
            return `Error approving Morpho Vault as spender: ${approvalResult}`;
        }

        const contractArgs = {
            assets: atomicAssets,
            receiver: args.receiver
        };
        
        const invocation = await wallet.invokeContract({
            contractAddress: args.vaultAddress,
            method: "deposit",
            abi: METAMORPHO_ABI,
            args: contractArgs
        });

        const result = await invocation.wait();

        return `Deposited ${args.assets} to Morpho Vault ${args.vaultAddress} with transaction hash: ${result.getTransactionHash()} and transaction link: ${result.getTransactionLink()}`;
    } catch (error) {
        return `Error depositing to Morpho Vault: ${error}`;
    }
}

/**
 * Morpho Vault deposit action.
 */
export class MorphoDepositAction implements CdpAction<typeof MorphoDepositInput> {
  public name = "morpho_deposit";
  public description = DEPOSIT_PROMPT;
  public argsSchema = MorphoDepositInput;
  public func = depositToMorpho;
} 