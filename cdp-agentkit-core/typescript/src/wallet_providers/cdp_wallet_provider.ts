// TODO: Remove this once we have a real implementation
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReadContractParameters, ReadContractReturnType, TransactionRequest } from "viem";
import { EvmWalletProvider } from "./evm_wallet_provider";
import { Network } from "../network";

/**
 * A wallet provider that uses the Coinbase SDK.
 */
export class CdpWalletProvider extends EvmWalletProvider {
  /**
   * Constructs a new CdpWalletProvider.
   */
  constructor() {
    super();
  }

  /**
   * Signs a message.
   *
   * @param message - The message to sign.
   * @returns The signed message.
   */
  async signMessage(message: string): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Signs a typed data object.
   *
   * @param typedData - The typed data object to sign.
   * @returns The signed typed data object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async signTypedData(typedData: any): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Signs a transaction.
   *
   * @param transaction - The transaction to sign.
   * @returns The signed transaction.
   */
  async signTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Sends a transaction.
   *
   * @param transaction - The transaction to send.
   * @returns The hash of the transaction.
   */
  async sendTransaction(transaction: TransactionRequest): Promise<`0x${string}`> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Gets the address of the wallet.
   */
  getAddress(): string {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Gets the network of the wallet.
   */
  getNetwork(): Network {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Gets the name of the wallet provider.
   *
   * @returns The name of the wallet provider.
   */
  getName(): string {
    return "cdp_wallet_provider";
  }

  /**
   * Gets the balance of the wallet.
   *
   * @returns The balance of the wallet.
   */
  async getBalance(): Promise<bigint> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Waits for a transaction receipt.
   *
   * @param txHash - The hash of the transaction to wait for.
   * @returns The transaction receipt.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async waitForTransactionReceipt(txHash: `0x${string}`): Promise<any> {
    // TODO: Implement
    throw Error("Unimplemented");
  }

  /**
   * Reads a contract.
   *
   * @param params - The parameters to read the contract.
   * @returns The response from the contract.
   */
  async readContract(params: ReadContractParameters): Promise<ReadContractReturnType> {
    // TODO: Implement
    throw Error("Unimplemented");
  }
}
