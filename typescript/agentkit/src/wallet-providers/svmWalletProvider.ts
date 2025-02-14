/* eslint-disable @typescript-eslint/no-explicit-any */

import { WalletProvider } from "./walletProvider";
import {
  RpcResponseAndContext,
  SignatureStatus,
  SignatureStatusConfig,
  VersionedTransaction,
} from "@solana/web3.js";

/**
 * SvmWalletProvider is the abstract base class for all Solana wallet providers (non browsers).
 *
 * @abstract
 */
export abstract class SvmWalletProvider extends WalletProvider {
  /**
   * Sign a transaction.
   *
   * @param transaction - The transaction to sign.
   * @returns The signed transaction.
   */
  abstract signTransaction(transaction: VersionedTransaction): Promise<VersionedTransaction>;

  /**
   * Send a transaction.
   *
   * @param transaction - The transaction to send.
   * @returns The transaction signature.
   */
  abstract sendTransaction(transaction: VersionedTransaction): Promise<string>;

  /**
   * Sign and send a transaction.
   *
   * @param transaction - The transaction to sign and send.
   * @returns The transaction signature.
   */
  abstract signAndSendTransaction(transaction: VersionedTransaction): Promise<string>;

  /**
   * Get the status of a transaction.
   *
   * @param signature - The transaction signature.
   * @returns The transaction status.
   */
  abstract getSignatureStatus(
    signature: string,
    options?: SignatureStatusConfig,
  ): Promise<RpcResponseAndContext<SignatureStatus | null>>;
}
