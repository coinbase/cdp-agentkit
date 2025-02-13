import { CHAIN_ID, NETWORK_ID } from "./network";

export interface EvmNetwork {
  /**
   * The protocol family of the network.
   */
  protocolFamily: "evm";

  /**
   * The network ID of the network.
   */
  networkId: NETWORK_ID;

  /**
   * The chain ID of the network.
   */
  chainId: CHAIN_ID;
}

export interface BitcoinNetwork {
  /**
   * The protocol family of the network.
   */
  protocolFamily: "bitcoin";

  /**
   * The network ID of the network.
   */
  networkId: "mainnet";
}

export interface SolanaNetwork {
  /**
   * The protocol family of the network.
   */
  protocolFamily: "solana";

  /**
   * The network ID of the network.
   */
  networkId: "mainnet";
}

/**
 * Network is the network that the wallet provider is connected to.
 */
export type Network = EvmNetwork | BitcoinNetwork | SolanaNetwork;
