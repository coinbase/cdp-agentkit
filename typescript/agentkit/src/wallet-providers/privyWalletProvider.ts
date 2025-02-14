import { PrivyClient } from "@privy-io/server-auth";
import { createViemAccount } from "@privy-io/server-auth/viem";
import { ViemWalletProvider } from "./viemWalletProvider";
import { createWalletClient, http, WalletClient } from "viem";

import * as chains from "viem/chains";

/**
 * Get a chain from the viem chains object
 *
 * @param id - The chain ID
 * @returns The chain
 */
function getChain(id: number) {
  const chainList = Object.values(chains);
  return chainList.find(chain => chain.id === id);
}

/**
 * Configuration options for the Privy wallet provider.
 *
 * @interface
 */
interface PrivyWalletConfig {
  /** The Privy application ID */
  appId: string;
  /** The Privy application secret */
  appSecret: string;
  /** The ID of the wallet to use, if not provided a new wallet will be created */
  walletId?: string;
  /** Optional network ID to connect to */
  chainId?: number;
  /** Optional authorization key for the wallet API */
  authorizationPrivateKey?: string;
  /** Optional authorization key ID for creating new wallets */
  authorizationKeyId?: string;
}

/**
 * A wallet provider that uses Privy's server wallet API.
 * This provider extends the ViemWalletProvider to provide Privy-specific wallet functionality
 * while maintaining compatibility with the base wallet provider interface.
 */
export class PrivyWalletProvider extends ViemWalletProvider {
  #walletId: string;
  #authorizationPrivateKey: string | undefined;

  /**
   * Private constructor to enforce use of factory method.
   *
   * @param walletClient - The Viem wallet client instance
   * @param config - The configuration options for the Privy wallet
   */
  private constructor(
    walletClient: WalletClient,
    config: PrivyWalletConfig & { walletId: string }, // Require walletId in constructor
  ) {
    super(walletClient);
    this.#walletId = config.walletId; // Now guaranteed to exist
    this.#authorizationPrivateKey = config.authorizationPrivateKey;
  }

  /**
   * Creates and configures a new PrivyWalletProvider instance.
   *
   * @param config - The configuration options for the Privy wallet
   * @returns A configured PrivyWalletProvider instance
   *
   * @example
   * ```typescript
   * const provider = await PrivyWalletProvider.configureWithWallet({
   *   appId: "your-app-id",
   *   appSecret: "your-app-secret",
   *   walletId: "wallet-id",
   *   networkId: 84532
   * });
   * ```
   */
  public static async configureWithWallet(config: PrivyWalletConfig): Promise<PrivyWalletProvider> {
    const privy = new PrivyClient(config.appId, config.appSecret, {
      walletApi: config.authorizationPrivateKey
        ? {
            authorizationPrivateKey: config.authorizationPrivateKey,
          }
        : undefined,
    });

    let walletId: string;
    let address: `0x${string}`;

    if (!config.walletId) {
      if (!config.authorizationPrivateKey) {
        throw new Error("authorizationPrivateKey is required when creating a new wallet");
      }
      if (!config.authorizationKeyId) {
        throw new Error(
          "authorizationKeyId is required when creating a new wallet with an authorization key, this can be found in your Privy Dashboard",
        );
      }

      const wallet = await privy.walletApi.create({
        chainType: "ethereum",
        authorizationKeyIds: [config.authorizationKeyId],
      });
      walletId = wallet.id;
      address = wallet.address as `0x${string}`;
    } else {
      walletId = config.walletId;
      const wallet = await privy.walletApi.getWallet({ id: walletId });
      if (!wallet) {
        throw new Error(`Wallet with ID ${walletId} not found`);
      }
      address = wallet.address as `0x${string}`;
    }

    const account = await createViemAccount({
      walletId,
      address,
      privy,
    });

    const network = {
      protocolFamily: "evm" as const,
      chainId: config.chainId || 84532,
    };

    const chain = getChain(network.chainId);
    if (!chain) {
      throw new Error(`Chain with ID ${network.chainId} not found`);
    }

    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    });
    return new PrivyWalletProvider(walletClient, { ...config, walletId });
  }

  /**
   * Gets the name of the wallet provider.
   *
   * @returns The string identifier for this wallet provider
   */
  getName(): string {
    return "privy_wallet_provider";
  }

  /**
   * Exports the wallet data.
   *
   * @returns The wallet data
   */
  exportWallet(): {
    walletId: string;
    authorizationPrivateKey: string | undefined;
    networkId?: string;
  } {
    return {
      walletId: this.#walletId,
      authorizationPrivateKey: this.#authorizationPrivateKey,
      networkId: this.getNetwork().networkId,
    };
  }
}
