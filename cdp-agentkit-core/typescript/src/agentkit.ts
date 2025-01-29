import { WalletProvider, CdpWalletProvider } from "./wallet_providers";
import { Action, ActionProvider } from "./action_providers";

/**
 * Configuration options for AgentKit
 */
interface AgentKitOptions {
  walletProvider?: WalletProvider;
  actionProviders?: ActionProvider[];
  actions?: Action[];
}

/**
 * AgentKit
 */
export class AgentKit {
  private walletProvider: WalletProvider;
  private actionProviders?: ActionProvider[];
  private actions: Action[];

  /**
   * Initializes a new AgentKit instance
   *
   * @param config - Configuration options for the AgentKit
   * @param config.walletProvider - The wallet provider to use
   * @param config.actionProviders - The action providers to use
   * @param config.actions - The actions to use
   */
  public constructor(config: AgentKitOptions = {}) {
    this.walletProvider = config.walletProvider || new CdpWalletProvider();
    this.actionProviders = config.actionProviders;
    this.actions = config.actions || [];
  }

  public getActions(): Action[] {
    // TODO: Implement
    throw Error("Unimplemented");
  }
}
