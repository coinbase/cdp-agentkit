/**
 * Network is the network that the wallet provider is connected to.
 */
export interface Network {
  /**
   * The protocol family of the network.
   */
  protocolFamily: string;

  /**
   * The network ID of the network.
   */
  networkId?: string;

  /**
   * The chain ID of the network.
   */
  chainId?: string;
}

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
}
