import { WalletProvider, CdpWalletProvider } from "./wallet-providers";
import { Action, ActionProvider } from "./action-providers";

/**
 * Configuration options for AgentKit
 */
type AgentKitOptions = {
  cdpApiKeyName?: string;
  cdpApiKeyPrivateKey?: string;
  walletProvider?: WalletProvider;
  actionProviders?: ActionProvider[];
  actions?: Action[];
};

/**
 * AgentKit
 */
export class AgentKit {
  private walletProvider: WalletProvider;
  private actionProviders?: ActionProvider[];
  private actions?: Action[];

  /**
   * Initializes a new AgentKit instance
   *
   * @param config - Configuration options for the AgentKit
   * @param config.walletProvider - The wallet provider to use
   * @param config.actionProviders - The action providers to use
   * @param config.actions - The actions to use
   */
  private constructor(config: AgentKitOptions & { walletProvider: WalletProvider }) {
    this.walletProvider = config.walletProvider;
    this.actionProviders = config.actionProviders || [];
    this.actions = config.actions || [];
  }

  /**
   * Initializes a new AgentKit instance
   *
   * @param config - Configuration options for the AgentKit
   * @param config.walletProvider - The wallet provider to use
   * @param config.actionProviders - The action providers to use
   * @param config.actions - The actions to use
   *
   * @returns A new AgentKit instance
   */
  public static async from(config: AgentKitOptions = {}): Promise<AgentKit> {
    let walletProvider: WalletProvider | undefined = config.walletProvider;

    if (!config.walletProvider) {
      if (!config.cdpApiKeyName || !config.cdpApiKeyPrivateKey) {
        throw new Error(
          "cdpApiKeyName and cdpApiKeyPrivateKey are required if not providing a walletProvider",
        );
      }

      walletProvider = await CdpWalletProvider.configureWithWallet({
        apiKeyName: config.cdpApiKeyName,
        apiKeyPrivateKey: config.cdpApiKeyPrivateKey,
      });
    }

    return new AgentKit({ ...config, walletProvider: walletProvider! });
  }

  /**
   * Returns the actions available to the AgentKit.
   *
   * @returns An array of actions
   */
  public getActions(): Action[] {
    let actions: Action[] = this.actions || [];

    if (this.actionProviders) {
      for (const actionProvider of this.actionProviders) {
        if (actionProvider.supportsNetwork(this.walletProvider.getNetwork())) {
          actions = actions.concat(actionProvider.getActions(this.walletProvider));
        }
      }
    }

    return actions;
  }
}
