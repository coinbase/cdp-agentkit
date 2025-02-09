/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/member-ordering */
import { Pool, EthereumTransactionTypeExtended } from "@aave/contract-helpers";
import { AaveV3Base } from "@bgd-labs/aave-address-book";
import { parseUnits } from "viem";
import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { CreateAction } from "../actionDecorator";
import { Network } from "../../network";
import { EvmWalletProvider } from "../../wallet-providers";
import { AAVE_V3_ADDRESSES, SUPPORTED_ASSETS } from "./constants";
import { SupplySchema, WithdrawSchema } from "./schemas";
import { approve } from "../../utils";
import { ethers } from "ethers";

export const SUPPORTED_NETWORKS = ["base-mainnet"];

/**
 * AaveActionProvider provides actions for interacting with the Aave protocol
 */
export class AaveActionProvider extends ActionProvider<EvmWalletProvider> {
  /**
   * Creates a new instance of AaveActionProvider
   */
  constructor() {
    super("aave", []);
  }

  /**
   * Check if network is supported
   *
   * @param network - The network to check support for
   * @returns True if network is supported
   */
  supportsNetwork = (network: Network): boolean =>
    network.protocolFamily === "evm" && SUPPORTED_NETWORKS.includes(network.networkId!);

  /**
   * Supply assets to Aave
   *
   * @param wallet - The wallet provider to use
   * @param args - The supply parameters
   * @returns A string describing the result
   */
  @CreateAction({
    name: "supply",
    description: `
This tool will supply assets to the Aave protocol. It takes:
- chain: The chain to supply on (e.g. base-mainnet)
- amount: The amount to supply
- asset: The asset to supply (e.g. ETH, USDC)

The tool will handle the approval and supply transaction.
    `,
    schema: SupplySchema,
  })
  async supply(wallet: EvmWalletProvider, args: z.infer<typeof SupplySchema>): Promise<string> {
    try {
      const { chain, amount, asset } = args;
      console.log(`Calling the AAVE logic to supply ${amount} ${asset}`);

      // Validate chain is supported
      const chainAddresses = AAVE_V3_ADDRESSES[chain];
      if (!chainAddresses || chain !== "base-mainnet") {
        return `Error: Aave is only available on Base mainnet. Current network is Base Sepolia. Please switch to Base mainnet to interact with Aave.`;
      }

      const provider = await wallet.getProvider();
      if (!provider) {
        return "Error: Could not connect to network provider";
      }

      const ethersProvider = new ethers.providers.Web3Provider(provider as any);
      // Ensure provider is ready
      await ethersProvider.ready;

      const pool = new Pool(ethersProvider, {
        POOL: chainAddresses.POOL,
        WETH_GATEWAY: chainAddresses.WETH_GATEWAY,
      });

      // For ETH, we need to wrap it to WETH first
      if (asset.toUpperCase() === "ETH") {
        // First wrap ETH to WETH using the WETH Gateway
        const wrapTxs = await pool.deposit({
          user: wallet.getAddress(),
          amount: parseUnits(amount, 18).toString(),
          reserve: chainAddresses.ASSETS.WETH,
        });

        console.log(`Generated wrap ETH transaction`);
        const wrapResult = await this.submitTransaction(wallet, wrapTxs[0]);
        console.log(`Successfully wrapped ETH to WETH. Transaction: ${wrapResult}`);

        // Then supply WETH
        const supplyTxs = await pool.supply({
          user: wallet.getAddress(),
          reserve: chainAddresses.ASSETS.WETH,
          amount: parseUnits(amount, 18).toString(),
          onBehalfOf: wallet.getAddress(),
        });

        console.log(`Generated ${supplyTxs.length} supply transaction(s)`);
        const results: string[] = [];
        for (const tx of supplyTxs) {
          const result = await this.submitTransaction(wallet, tx);
          results.push(result);
        }

        const finalTx = results[results.length - 1];
        return `Successfully supplied ${amount} ETH to Aave. Wrap tx: ${wrapResult}, Supply tx: ${finalTx}`;
      }

      // For other assets, use normal supply flow
      const reserve = chainAddresses.ASSETS[asset.toUpperCase()];
      if (!reserve) {
        throw new Error(`Asset ${asset} is not supported`);
      }

      // Convert amount to atomic units based on asset decimals
      const assetConfig = SUPPORTED_ASSETS[asset.toUpperCase()];
      if (!assetConfig) {
        throw new Error(`Asset ${asset} is not supported`);
      }
      const atomicAmount = parseUnits(amount, assetConfig.decimals);

      // Handle approval if needed (not needed for ETH)
      if (asset.toUpperCase() !== "ETH") {
        const approvalResult = await approve(wallet, reserve, chainAddresses.POOL, atomicAmount);
        if (approvalResult.startsWith("Error")) {
          return `Error approving Aave Pool as spender: ${approvalResult}`;
        }
      }

      // Prepare supply parameters
      const supplyParams = {
        user: wallet.getAddress(),
        reserve,
        amount: atomicAmount.toString(),
      };

      console.log(`Prepared supply params:`, supplyParams);

      // Get supply transaction
      const txs = await pool.supply(supplyParams);
      console.log(`Generated ${txs.length} supply transaction(s)`);

      // Submit the transactions
      if (txs && txs.length > 0) {
        console.log(`Submitting supply transactions`);
        const results: string[] = [];
        for (const tx of txs) {
          const result = await this.submitTransaction(wallet, tx);
          results.push(result);
        }

        const finalTx = results[results.length - 1];
        return `Successfully supplied ${amount} ${asset} to Aave. Transaction: ${finalTx}`;
      } else {
        throw new Error("No transaction generated from Aave Pool");
      }
    } catch (error) {
      console.error("DEBUG - Supply error:", error);
      return `Error supplying to Aave: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  /**
   * Withdraw assets from Aave
   *
   * @param wallet - The wallet provider to use
   * @param args - The withdrawal parameters
   * @returns A string describing the result
   */
  @CreateAction({
    name: "withdraw",
    description: `
This tool will withdraw assets from the Aave protocol. It takes:
- chain: The chain to withdraw from (e.g. base-mainnet)
- amount: The amount to withdraw  
- asset: The asset to withdraw (e.g. ETH, USDC)

The tool will handle the withdrawal transaction.
    `,
    schema: WithdrawSchema,
  })
  async withdraw(wallet: EvmWalletProvider, args: z.infer<typeof WithdrawSchema>): Promise<string> {
    try {
      const { chain, amount, asset } = args;
      console.log(`Calling the AAVE logic to withdraw ${amount} ${asset}`);

      // Similar validation as supply
      const chainAddresses = AAVE_V3_ADDRESSES[chain];
      if (!chainAddresses) {
        return `Error withdrawing from Aave: Chain ${chain} is not supported`;
      }

      const provider = await wallet.getProvider();
      console.log("Initializing withdraw with provider:", provider);

      const ethersProvider = new ethers.providers.Web3Provider(provider as any);
      const pool = new Pool(ethersProvider, {
        POOL: chainAddresses.POOL,
        WETH_GATEWAY: chainAddresses.WETH_GATEWAY,
      });

      console.log("Pool initialized, asset:", asset);

      // Handle ETH withdrawal first
      if (asset.toUpperCase() === "ETH") {
        console.log("Processing ETH withdrawal");
        const withdrawTxs = await pool.withdraw({
          user: wallet.getAddress(),
          reserve: chainAddresses.ASSETS.WETH,
          amount: parseUnits(amount, 18).toString(),
          onBehalfOf: wallet.getAddress(),
        });

        console.log("Generated withdraw transactions:", withdrawTxs);
        const txResponse = await this.submitTransaction(wallet, withdrawTxs[0]);
        console.log("Withdraw transaction response:", txResponse);

        return `Successfully withdrew ${amount} ETH. Transaction hash: ${txResponse}`;
      }

      // Then handle other assets
      const assetKey = Object.keys(AaveV3Base.ASSETS).find(
        key => key.toLowerCase() === asset.toLowerCase(),
      );

      if (!assetKey) {
        return `Error withdrawing from Aave: Unsupported asset: ${asset}`;
      }

      // Get the reserve address for the input asset
      const reserve = AaveV3Base.ASSETS[assetKey as keyof typeof AaveV3Base.ASSETS].UNDERLYING;
      if (!reserve) {
        throw new Error(`Unsupported asset: ${asset}`);
      }

      // Convert amount to atomic units
      const assetConfig = SUPPORTED_ASSETS[asset.toUpperCase()];
      if (!assetConfig) {
        throw new Error(`Asset ${asset} is not supported`);
      }
      const atomicAmount = parseUnits(amount, assetConfig.decimals);

      // Prepare withdraw parameters
      const withdrawParams = {
        user: wallet.getAddress(),
        reserve,
        amount: atomicAmount.toString(),
      };

      // Get withdraw transaction
      const txs = await pool.withdraw(withdrawParams);

      // Submit transactions
      if (txs && txs.length > 0) {
        console.log(`Submitting withdraw transactions`);
        const results: string[] = [];
        for (const tx of txs) {
          const result = await this.submitTransaction(wallet, tx);
          results.push(result);
        }

        const finalTx = results[results.length - 1];
        return `Successfully withdrew ${amount} ${asset} from Aave. Transaction: ${finalTx}`;
      } else {
        throw new Error("No transaction generated from Aave Pool");
      }
    } catch (error) {
      console.error("Withdraw error:", error);
      return `Error withdrawing from Aave: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  /**
   * Helper to submit transactions
   *
   * @param wallet - The wallet provider to use
   * @param tx - The transaction to submit
   * @returns The transaction hash
   */
  private async submitTransaction(
    wallet: EvmWalletProvider,
    tx: EthereumTransactionTypeExtended,
  ): Promise<string> {
    try {
      const txData = await tx.tx();
      const { from, gasPrice, gasLimit, ...txParams } = txData;

      const hash = await wallet.sendTransaction({
        ...txParams,
        data: txParams.data as `0x${string}`,
        to: txParams.to as `0x${string}`,
        value: txParams.value ? BigInt(txParams.value) : 0n,
        // Convert ethers gas values to viem format if present
        gas: gasLimit ? BigInt(gasLimit.toString()) : undefined,
      });

      const receipt = await wallet.waitForTransactionReceipt(hash);
      console.log(`Transaction receipt:`, receipt);

      return hash;
    } catch (error: unknown) {
      // Check if error contains gas estimation error details
      const gasError = error as { code?: string; error?: { body?: string }; reason?: string };
      if (gasError.code === "UNPREDICTABLE_GAS_LIMIT") {
        const reason = gasError.error?.body
          ? JSON.parse(gasError.error.body).error.message
          : gasError.reason;
        throw new Error(`Transaction failed: ${reason}`);
      }
      throw error;
    }
  }
}

export const aaveActionProvider = () => new AaveActionProvider();
