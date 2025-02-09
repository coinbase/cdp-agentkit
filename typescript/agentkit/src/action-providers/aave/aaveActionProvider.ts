/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-description */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/member-ordering */
import { Pool, EthereumTransactionTypeExtended } from "@aave/contract-helpers";
import { AaveV3Base } from "@bgd-labs/aave-address-book";
import { parseUnits, formatUnits } from "viem";
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

      // Validate chain and get provider
      const chainAddresses = AAVE_V3_ADDRESSES[chain];
      if (!chainAddresses) {
        return `Error: Aave is only available on Base mainnet...`;
      }

      const provider = (await wallet.getProvider()) as any;
      if (!provider) {
        return "Error: Could not connect to network provider";
      }

      // Create ethers provider
      const ethersProvider = new ethers.providers.JsonRpcProvider((provider as any).transport.url);
      console.log(`Created ethers provider with URL: ${(provider as any).transport.url}`);

      // Initialize Aave Pool
      const pool = new Pool(ethersProvider, {
        POOL: AaveV3Base.POOL,
        WETH_GATEWAY: AaveV3Base.WETH_GATEWAY,
      });

      // Handle USDC supply
      if (asset.toUpperCase() === "USDC") {
        const atomicAmount = parseUnits(amount, SUPPORTED_ASSETS.USDC.decimals);

        try {
          // First approve USDC spending
          const approvalResult = await approve(
            wallet,
            AaveV3Base.ASSETS.USDC.UNDERLYING,
            AaveV3Base.POOL,
            atomicAmount,
          );

          if (approvalResult.startsWith("Error")) {
            return `Error: Failed to approve USDC: ${approvalResult}`;
          }
          console.log("USDC approved for Aave Pool");

          // Create Pool interface for encoding
          const poolInterface = new ethers.utils.Interface([
            "function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)",
          ]);

          // Update supply params
          const supplyParams = {
            from: wallet.getAddress() as `0x${string}`,
            to: AaveV3Base.POOL as `0x${string}`,
            data: poolInterface.encodeFunctionData("supply", [
              AaveV3Base.ASSETS.USDC.UNDERLYING,
              atomicAmount.toString(),
              wallet.getAddress(),
              0,
            ]) as `0x${string}`,
          };

          const supplyTx = await wallet.sendTransaction(supplyParams);
          await wallet.waitForTransactionReceipt(supplyTx);

          return `Successfully supplied ${amount} USDC to Aave. Transaction: https://basescan.org/tx/${supplyTx}`;
        } catch (error) {
          console.error("Supply transaction failed:", error);
          return `Error executing supply: ${error instanceof Error ? error.message : String(error)}`;
        }
      }

      // Handle ETH supply
      if (asset.toUpperCase() === "ETH") {
        const atomicAmount = parseUnits(amount, 18);

        // Check ETH balance
        const balance = await provider.getBalance(wallet.getAddress() as `0x${string}`);
        if (balance < atomicAmount) {
          return `Error: Insufficient ETH balance. You have ${formatUnits(balance, 18)} ETH but need ${amount} ETH`;
        }

        try {
          // Supply ETH using WETH Gateway
          const supplyParams = {
            user: wallet.getAddress(),
            reserve: AaveV3Base.ASSETS.WETH.UNDERLYING,
            amount: atomicAmount.toString(),
            onBehalfOf: wallet.getAddress(),
            value: atomicAmount,
          };

          const txs = await pool.supply(supplyParams);
          const supplyTx = await this.submitTransaction(wallet, txs[0]);

          // Wait for transaction confirmation
          await wallet.waitForTransactionReceipt(supplyTx as `0x${string}`);

          return `Successfully supplied ${amount} ETH to Aave. Transaction: https://basescan.org/tx/${supplyTx}`;
        } catch (error) {
          console.error("ETH Supply transaction failed:", error);
          return `Error executing ETH supply: ${error instanceof Error ? error.message : String(error)}`;
        }
      }

      return `Error: Unsupported asset ${asset}`;
    } catch (error) {
      console.error("Supply error:", error);
      return `Error supplying to Aave: ${error instanceof Error ? error.message : String(error)}`;
    }
  }

  // Add helper method to get token balance
  /**
   *
   * @param wallet
   * @param tokenAddress
   */
  private async getTokenBalance(wallet: EvmWalletProvider, tokenAddress: string): Promise<bigint> {
    const erc20Contract = {
      address: tokenAddress as `0x${string}`,
      abi: [
        {
          type: "function",
          name: "balanceOf",
          inputs: [{ name: "account", type: "address" }],
          outputs: [{ type: "uint256" }],
          stateMutability: "view",
        },
      ] as const,
    };

    return (await wallet.readContract({
      ...erc20Contract,
      functionName: "balanceOf",
      args: [wallet.getAddress() as `0x${string}`],
    })) as bigint;
  }

  // Add helper method to get aToken balance
  /**
   *
   * @param wallet
   * @param asset
   */
  private async getATokenBalance(wallet: EvmWalletProvider, asset: string): Promise<bigint> {
    const assetConfig = SUPPORTED_ASSETS[asset.toUpperCase()];
    if (!assetConfig) {
      throw new Error(`Asset ${asset} is not supported`);
    }

    // Get the aToken address for the asset
    const assetKey = Object.keys(AaveV3Base.ASSETS).find(
      key => key.toLowerCase() === asset.toLowerCase(),
    );
    if (!assetKey) {
      throw new Error(`Asset ${asset} not found in Aave`);
    }

    const aTokenAddress = AaveV3Base.ASSETS[assetKey as keyof typeof AaveV3Base.ASSETS].A_TOKEN;

    return this.getTokenBalance(wallet, aTokenAddress);
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
    description: `This tool will withdraw assets from the Aave protocol. It takes:
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
      console.log(`Checking aToken balance before withdrawing ${amount} ${asset}`);

      // Get decimals and convert amount once
      const assetConfig = SUPPORTED_ASSETS[asset.toUpperCase()];
      if (!assetConfig) {
        return `Error: Unsupported asset ${asset}`;
      }
      const atomicAmount = parseUnits(amount, assetConfig.decimals);

      // Check aToken balance
      const aTokenBalance = await this.getATokenBalance(wallet, asset);

      if (aTokenBalance < atomicAmount) {
        return `Error: Insufficient ${asset} balance in Aave. You have ${formatUnits(
          aTokenBalance,
          assetConfig.decimals,
        )} ${asset} but tried to withdraw ${amount} ${asset}`;
      }

      // Similar validation as supply
      const chainAddresses = AAVE_V3_ADDRESSES[chain];
      if (!chainAddresses) {
        return `Error withdrawing from Aave: Chain ${chain} is not supported`;
      }

      const provider = (await wallet.getProvider()) as any;
      console.log("Initializing withdraw with provider...");

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

      // Handle USDC withdrawal
      if (asset.toUpperCase() === "USDC") {
        try {
          // Get aToken address
          const aTokenAddress = AaveV3Base.ASSETS.USDC.A_TOKEN;
          // First approve aToken spending
          const approvalResult = await approve(
            wallet,
            aTokenAddress,
            AaveV3Base.POOL,
            atomicAmount,
          );

          if (approvalResult.startsWith("Error")) {
            return `Error: Failed to approve aUSDC: ${approvalResult}`;
          }
          console.log("aUSDC approved for Aave Pool");

          // Create Pool interface for encoding
          const poolInterface = new ethers.utils.Interface([
            "function withdraw(address asset, uint256 amount, address to)",
          ]);

          // Prepare withdraw transaction
          const withdrawParams = {
            from: wallet.getAddress() as `0x${string}`,
            to: AaveV3Base.POOL as `0x${string}`,
            data: poolInterface.encodeFunctionData("withdraw", [
              AaveV3Base.ASSETS.USDC.UNDERLYING,
              atomicAmount.toString(),
              wallet.getAddress(),
            ]) as `0x${string}`,
            gas: 300000n,
          };

          console.log("Submitting withdraw transaction with params:", {
            to: withdrawParams.to,
            gas: withdrawParams.gas.toString(),
            amount: atomicAmount.toString(),
          });

          const withdrawTx = await wallet.sendTransaction(withdrawParams);
          await wallet.waitForTransactionReceipt(withdrawTx);

          return `Successfully withdrew ${amount} USDC from Aave. Transaction: https://basescan.org/tx/${withdrawTx}`;
        } catch (error) {
          console.error("Withdraw transaction failed:", error);
          return `Error executing withdraw: ${error instanceof Error ? error.message : String(error)}`;
        }
      }

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

      // Validate transaction data
      if (!txParams.to || !txParams.data) {
        throw new Error("Invalid transaction data");
      }

      // Add manual gas limit and buffer
      const gas = gasLimit ? BigInt(gasLimit.toString()) * 2n : 1000000n;

      console.log("Submitting transaction with params:", {
        to: txParams.to,
        value: txParams.value?.toString() || "0",
        gas: gas.toString(),
        data: txParams.data?.slice(0, 66) + "...",
      });

      try {
        const hash = await wallet.sendTransaction({
          ...txParams,
          data: txParams.data as `0x${string}`,
          to: txParams.to as `0x${string}`,
          value: txParams.value ? BigInt(txParams.value) : 0n,
          gas,
        });

        const receipt = await wallet.waitForTransactionReceipt(hash);
        if (receipt.status !== "success") {
          throw new Error("Transaction failed");
        }

        return hash;
      } catch (txError: any) {
        if (txError.message?.includes("transfer amount exceeds balance")) {
          throw new Error("Insufficient USDC balance. Please check your balance and try again.");
        }
        throw txError;
      }
    } catch (error: unknown) {
      console.error("Transaction error:", error);
      throw error;
    }
  }
}

export const aaveActionProvider = () => new AaveActionProvider();
