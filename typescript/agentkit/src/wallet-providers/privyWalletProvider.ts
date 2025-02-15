import { createViemAccount } from "@privy-io/server-auth/viem";
import { ViemWalletProvider } from "./viemWalletProvider";
import { createWalletClient, Hex, http, WalletClient } from "viem";
import { getChain } from "../network/network";
import { createPrivyWallet, PrivyWalletConfig as PrivyWalletConfigBase } from "./privyShared";

interface PrivyWalletConfig extends PrivyWalletConfigBase {
  /** Optional chain ID to connect to */
  chainId?: string;
}

type PrivyWalletExport = {
  walletId: string;
  authorizationPrivateKey: string | undefined;
  chainId: string | undefined;
};

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
   *   chainId: "84532"
   * });
   * ```
   */
  public static async configureWithWallet(
    config: Omit<PrivyWalletConfig, "chainType">,
  ): Promise<PrivyWalletProvider> {
    const { wallet, privy } = await createPrivyWallet({
      ...config,
      chainType: "ethereum",
    });

    const account = await createViemAccount({
      walletId: wallet.id,
      address: wallet.address as Hex,
      privy,
    });

    const chainId = config.chainId || "84532";

    const chain = getChain(chainId);
    if (!chain) {
      throw new Error(`Chain with ID ${chainId} not found`);
    }

    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    });
    return new PrivyWalletProvider(walletClient, {
      ...config,
      walletId: wallet.id,
      chainType: "ethereum",
    });
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
  exportWallet(): PrivyWalletExport {
    return {
      walletId: this.#walletId,
      authorizationPrivateKey: this.#authorizationPrivateKey,
      chainId: this.getNetwork().chainId,
    };
  }
}
