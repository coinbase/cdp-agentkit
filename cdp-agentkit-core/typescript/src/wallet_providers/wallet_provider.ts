import { Network } from "../network";

/**
 * WalletProvider is the abstract base class for all wallet providers.
 *
 * @abstract
 */
export abstract class WalletProvider {
  /**
   * Get the address of the wallet provider.
   *
   * @returns The address of the wallet provider.
   */
  abstract getAddress(): string;

  /**
   * Get the network of the wallet provider.
   *
   * @returns The network of the wallet provider.
   */
  abstract getNetwork(): Network;

  /**
   * Get the name of the wallet provider.
   *
   * @returns The name of the wallet provider.
   */
  abstract getName(): string;

  /**
   * Get the balance of the native asset of the network.
   *
   * @returns The balance of the native asset of the network.
   */
  abstract getBalance(): Promise<bigint>;
}
