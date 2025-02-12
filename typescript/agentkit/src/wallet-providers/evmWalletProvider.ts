// TODO: Improve type safety
/* eslint-disable @typescript-eslint/no-explicit-any */

import { WalletProvider } from "./walletProvider";
import { TransactionRequest, ReadContractParameters, ReadContractReturnType, PublicClient, EstimateGasReturnType, EstimateGasParameters, Chain, EstimateFeesPerGasParameters, FeeValuesEIP1559 } from "viem";

export interface EVMWalletProviderGasConfig {
  /**
   * A internal multiplier on gas limit estimation.
   */
  gasLimitMultiplier?: number;

  /**
   * A internal multiplier on fee per gas estimation.
   */
  feePerGasMultiplier?: number;
}

/**
 * Configuration options for the EVM Providers.
 */
export interface EVMWalletProviderConfig {
  /**
   * A RPC client.
   */
  publicClient: PublicClient;

  /**
   * Config for gas multipliers.
   */
  gas?: EVMWalletProviderGasConfig;
}

/**
 * EvmWalletProvider is the abstract base class for all EVM wallet providers.
 *
 * @abstract
 */
export abstract class EvmWalletProvider extends WalletProvider {
  #publicClient: PublicClient;
  #gasLimitMultiplier: number;
  #feePerGasMultiplier: number;

  constructor(config: EVMWalletProviderConfig) {
    super();
    this.#gasLimitMultiplier = Math.max(config.gas?.gasLimitMultiplier ?? 1, 1);
    this.#feePerGasMultiplier = Math.max(config.gas?.feePerGasMultiplier ?? 1, 1);
    this.#publicClient = config.publicClient;
  }

  /**
   * Sign a message.
   *
   * @param message - The message to sign.
   * @returns The signed message.
   */
  abstract signMessage(message: string | Uint8Array): Promise<`0x${string}`>;

  /**
   * Sign a typed data.
   *
   * @param typedData - The typed data to sign.
   * @returns The signed typed data.
   */
  abstract signTypedData(typedData: any): Promise<`0x${string}`>;

  /**
   * Sign a transaction.
   *
   * @param transaction - The transaction to sign.
   * @returns The signed transaction.
   */
  abstract signTransaction(transaction: TransactionRequest): Promise<`0x${string}`>;

  /**
   * Send a transaction.
   *
   * @param transaction - The transaction to send.
   * @returns The transaction hash.
   */
  abstract sendTransaction(transaction: TransactionRequest): Promise<`0x${string}`>;

  /**
   * Wait for a transaction receipt.
   *
   * @param txHash - The transaction hash.
   * @returns The transaction receipt.
   */
  abstract waitForTransactionReceipt(txHash: `0x${string}`): Promise<any>;

  /**
   * Read a contract.
   *
   * @param params - The parameters to read the contract.
   * @returns The response from the contract.
   */
  abstract readContract(params: ReadContractParameters): Promise<ReadContractReturnType>;

  protected async estimateGas(args: EstimateGasParameters<Chain | undefined>): Promise<EstimateGasReturnType> {
    const gasLimit = await this.#publicClient.estimateGas(args);

    return BigInt(Math.round(Number(gasLimit) * this.#gasLimitMultiplier))
  }

  protected async estimateFeesPerGas(args?: EstimateFeesPerGasParameters<Chain | undefined, undefined, "eip1559"> | undefined): Promise<FeeValuesEIP1559> {
    const feeData = await this.#publicClient.estimateFeesPerGas(args);

    return {
      maxFeePerGas: BigInt(Math.round(Number(feeData.maxFeePerGas) * this.#feePerGasMultiplier)),
      maxPriorityFeePerGas:  BigInt(Math.round(Number(feeData.maxPriorityFeePerGas) * this.#feePerGasMultiplier)),
    }
  }
}
