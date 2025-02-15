import { PrivyClient } from "@privy-io/server-auth";
import { SvmWalletProvider } from "./svmWalletProvider";
import {
  RpcResponseAndContext,
  SignatureStatus,
  VersionedTransaction,
  Connection,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  SOLANA_MAINNET_GENESIS_BLOCK_HASH,
  SOLANA_CLUSTER,
  SOLANA_MAINNET_NETWORK_ID,
  SOLANA_NETWORK_ID,
  SOLANA_NETWORKS,
  SOLANA_DEVNET_NETWORK_ID,
  SOLANA_DEVNET_GENESIS_BLOCK_HASH,
  SOLANA_TESTNET_NETWORK_ID,
  SOLANA_TESTNET_GENESIS_BLOCK_HASH,
} from "../network/svm";
import { Network } from "../network/types";
import { createPrivyWallet, PrivyWalletConfig as PrivyWalletConfigBase } from "./privyShared";

/**
 * Configuration options for the Privy wallet provider.
 *
 * @interface
 */
interface PrivyWalletConfig extends PrivyWalletConfigBase {
  /** The connection to use for the wallet */
  connection: Connection;
}

type PrivySolanaWalletExport = {
  walletId: string;
  authorizationPrivateKey: string | undefined;
};

/**
 * A wallet provider that uses Privy's server wallet API.
 * This provider extends the SvmWalletProvider to provide Privy-specific wallet functionality
 * while maintaining compatibility with the base wallet provider interface.
 */
export class PrivySolanaWalletProvider extends SvmWalletProvider {
  #walletId: string;
  #address: string;
  #authorizationPrivateKey: string | undefined;
  #privyClient: PrivyClient;
  #connection: Connection;
  #genesisHash: string;

  /**
   * Private constructor to enforce use of factory method.
   *
   * @param config - The configuration options for the Privy wallet
   */
  private constructor(
    config: PrivyWalletConfig & {
      walletId: string;
      address: string;
      privyClient: PrivyClient;
      connection: Connection;
      genesisHash: string;
    },
  ) {
    super();

    this.#walletId = config.walletId;
    this.#address = config.address;
    this.#authorizationPrivateKey = config.authorizationPrivateKey;
    this.#privyClient = config.privyClient;
    this.#connection = config.connection;
    this.#genesisHash = config.genesisHash;
  }

  /**
   * Creates and configures a new PrivySolanaWalletProvider instance.
   *
   * @param config - The configuration options for the Privy wallet
   * @returns A configured PrivySolanaWalletProvider instance
   *
   * @example
   * ```typescript
   * const provider = await PrivySolanaWalletProvider.configureWithWallet({
   *   appId: "your-app-id",
   *   appSecret: "your-app-secret",
   *   walletId: "wallet-id",
   * });
   * ```
   */
  public static async configureWithWallet<T extends PrivySolanaWalletProvider>(
    config: PrivyWalletConfig,
  ): Promise<T> {
    const { wallet, privy } = await createPrivyWallet(config);

    return new PrivySolanaWalletProvider({
      ...config,
      walletId: wallet.id,
      address: wallet.address,
      privyClient: privy,
      connection: config.connection,
      genesisHash: await config.connection.getGenesisHash(),
    }) as T;
  }

  /**
   * Create a new PrivySolanaWalletProvider from an SVM networkId and a keypair
   *
   * @param networkId - The SVM networkId
   * @param config - The configuration options for the Privy wallet
   * @returns The new PrivySolanaWalletProvider
   */
  static async fromNetwork<T extends PrivySolanaWalletProvider>(
    networkId: SOLANA_NETWORK_ID,
    config: Omit<PrivyWalletConfig, "connection" | "chainType">,
  ): Promise<T> {
    let genesisHash: SOLANA_CLUSTER;
    switch (networkId) {
      case SOLANA_MAINNET_NETWORK_ID:
        genesisHash = SOLANA_MAINNET_GENESIS_BLOCK_HASH;
        break;
      case SOLANA_DEVNET_NETWORK_ID:
        genesisHash = SOLANA_DEVNET_GENESIS_BLOCK_HASH;
        break;
      case SOLANA_TESTNET_NETWORK_ID:
        genesisHash = SOLANA_TESTNET_GENESIS_BLOCK_HASH;
        break;
      default:
        throw new Error(`${networkId} is not a valid SVM networkId`);
    }
    const rpcUrl = this.urlForCluster(genesisHash);
    return await this.fromRpcUrl(rpcUrl, config);
  }

  /**
   * Create a new PrivySolanaWalletProvider from an RPC URL and a keypair
   *
   * @param rpcUrl - The URL of the Solana RPC endpoint
   * @param config - The configuration options for the Privy wallet
   * @returns The new PrivySolanaWalletProvider
   */
  static async fromRpcUrl<T extends PrivySolanaWalletProvider>(
    rpcUrl: string,
    config: Omit<PrivyWalletConfig, "connection" | "chainType">,
  ): Promise<T> {
    const connection = new Connection(rpcUrl);
    return await this.fromConnection(connection, config);
  }

  /**
   * Create a new PrivySolanaWalletProvider from a Connection and a keypair
   *
   * @param connection - The Connection to use
   * @param config - The configuration options for the Privy wallet
   * @returns The new PrivySolanaWalletProvider
   */
  static async fromConnection<T extends PrivySolanaWalletProvider>(
    connection: Connection,
    config: Omit<PrivyWalletConfig, "connection" | "chainType">,
  ): Promise<T> {
    return (await PrivySolanaWalletProvider.configureWithWallet({
      ...config,
      connection,
      chainType: "solana",
    })) as T;
  }

  /**
   * Get the default RPC URL for a Solana cluster
   *
   * @param cluster - The cluster to get the RPC URL for
   * @returns The RPC URL for the cluster
   */
  static urlForCluster(cluster: SOLANA_CLUSTER): string {
    if (cluster in SOLANA_NETWORKS) {
      switch (cluster) {
        case SOLANA_MAINNET_GENESIS_BLOCK_HASH:
          return clusterApiUrl("mainnet-beta");
        case SOLANA_TESTNET_GENESIS_BLOCK_HASH:
          return clusterApiUrl("testnet");
        case SOLANA_DEVNET_GENESIS_BLOCK_HASH:
          return clusterApiUrl("devnet");
        default:
          throw new Error(`Unknown cluster: ${cluster}`);
      }
    } else {
      throw new Error(`Unknown cluster: ${cluster}`);
    }
  }

  /**
   * Gets the name of the wallet provider.
   *
   * @returns The string identifier for this wallet provider
   */
  getName(): string {
    return "privy_solana_wallet_provider";
  }

  /**
   * Exports the wallet data.
   *
   * @returns The wallet data
   */
  exportWallet(): PrivySolanaWalletExport {
    return {
      walletId: this.#walletId,
      authorizationPrivateKey: this.#authorizationPrivateKey,
    };
  }

  /**
   * Sign a transaction.
   *
   * @param transaction - The transaction to sign.
   * @returns The signed transaction.
   */
  async signTransaction(transaction: VersionedTransaction): Promise<VersionedTransaction> {
    const { signedTransaction } = await this.#privyClient.walletApi.solana.signTransaction({
      walletId: this.#walletId,
      transaction,
    });

    return signedTransaction as VersionedTransaction;
  }

  /**
   * Sign and send a transaction.
   *
   * @param transaction - The transaction to send.
   * @returns The transaction hash.
   */
  async signAndSendTransaction(transaction: VersionedTransaction): Promise<string> {
    try {
      const { hash } = await this.#privyClient.walletApi.solana.signAndSendTransaction({
        walletId: this.#walletId,
        caip2: `solana:${this.#genesisHash.substring(0, 32)}`,
        transaction,
      });

      return hash;
    } catch (error) {
      console.error("Failed to send transaction", error);
      throw new Error("Failed to send transaction");
    }
  }

  /**
   * Send a transaction.
   *
   * @param _ - The transaction to send.
   * @returns The transaction hash.
   */
  async sendTransaction(_: VersionedTransaction): Promise<string> {
    throw new Error("Method not implemented.");
  }

  /**
   * Get the address of the wallet.
   *
   * @returns The address of the wallet.
   */
  getAddress(): string {
    return this.#address;
  }

  /**
   * Get the network of the wallet.
   *
   * @returns The network of the wallet.
   */
  getNetwork(): Network {
    return SOLANA_NETWORKS[this.#genesisHash];
  }

  /**
   * Get the balance of the wallet.
   *
   * @returns The balance of the wallet.
   */
  async getBalance(): Promise<bigint> {
    const balance = await this.#connection.getBalance(new PublicKey(this.#address));
    return BigInt(balance);
  }

  /**
   * Transfer a native token.
   *
   * @param _ - The address to transfer the token to.
   * @param arg2 - The value to transfer.
   * @returns The transaction hash.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async nativeTransfer(_: string, arg2: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  /**
   * Get the status of a transaction.
   *
   * @param signature - The transaction signature.
   * @returns The transaction status.
   */
  async getSignatureStatus(
    signature: string,
  ): Promise<RpcResponseAndContext<SignatureStatus | null>> {
    return this.#connection.getSignatureStatus(signature);
  }
}
