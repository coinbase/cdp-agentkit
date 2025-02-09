import { EvmNetwork } from "../network";
import { WalletProvider } from "./walletProvider";
import {
  TransactionRequest,
  ReadContractParameters,
  ReadContractReturnType,
  Hex,
  TransactionReceipt,
} from "viem";

/**
 * EvmWalletProvider is the abstract base class for all EVM wallet providers.
 *
 * @abstract
 */
export abstract class EvmWalletProvider extends WalletProvider {
  /**
   * Sign a message.
   *
   * @param message - The message to sign.
   * @returns The signed message.
   */
  abstract signMessage(message: string | Uint8Array): Promise<Hex>;

  /**
   * Sign a typed data.
   *
   * @param typedData - The typed data to sign.
   * @returns The signed typed data.
   */
  abstract signTypedData(typedData: unknown): Promise<Hex>;

  /**
   * Sign a transaction.
   *
   * @param transaction - The transaction to sign.
   * @returns The signed transaction.
   */
  abstract signTransaction(transaction: TransactionRequest): Promise<Hex>;

  /**
   * Send a transaction.
   *
   * @param transaction - The transaction to send.
   * @returns The transaction hash.
   */
  abstract sendTransaction(transaction: TransactionRequest): Promise<Hex>;

  /**
   * Wait for a transaction receipt.
   *
   * @param txHash - The transaction hash.
   * @returns The transaction receipt.
   */
  abstract waitForTransactionReceipt(txHash: Hex): Promise<TransactionReceipt>;

  /**
   * Read a contract.
   *
   * @param params - The parameters to read the contract.
   * @returns The response from the contract.
   */
  abstract readContract(params: ReadContractParameters): Promise<ReadContractReturnType>;

  /**
   * Get the network of the wallet provider.
   *
   * @returns The network of the wallet provider.
   */
  abstract getNetwork(): EvmNetwork;
}
