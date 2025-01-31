import { Decimal } from "decimal.js";
import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { WalletProvider } from "../../wallet-providers";
import { CreateAction } from "../actionDecorator";
import { Network } from "../../network";

/**
 * Schema for the get_wallet_details action.
 * This action doesn't require any input parameters, so we use an empty object schema.
 */
const GetWalletDetailsSchema = z.object({});

/**
 * WalletActionProvider provides actions for getting basic wallet information.
 */
export class WalletActionProvider extends ActionProvider {
  /**
   * Constructor for the WalletActionProvider.
   */
  constructor() {
    super("wallet", []);
  }

  /**
   * Gets the details of the connected wallet including address, network, and balance.
   *
   * @param walletProvider - The wallet provider to get the details from.
   * @param _ - Empty args object (not used).
   * @returns A formatted string containing the wallet details.
   */
  @CreateAction({
    name: "get_wallet_details",
    description: `
    This tool will return the details of the connected wallet including:
    - Wallet address
    - Network information (protocol family, network ID, chain ID)
    - ETH token balance
    - Native token balance
    - Wallet provider name
    `,
    schema: GetWalletDetailsSchema,
  })
  async getWalletDetails(
    walletProvider: WalletProvider,
    _: z.infer<typeof GetWalletDetailsSchema>,
  ): Promise<string> {
    try {
      const address = walletProvider.getAddress();
      const network = walletProvider.getNetwork();
      const balance = await walletProvider.getBalance();
      const name = walletProvider.getName();

      // Convert balance from Wei to ETH using Decimal for precision
      const ethBalance = new Decimal(balance.toString()).div(new Decimal(10).pow(18));

      return `Wallet Details:
- Provider: ${name}
- Address: ${address}
- Network: 
  * Protocol Family: ${network.protocolFamily}
  * Network ID: ${network.networkId || "N/A"}
  * Chain ID: ${network.chainId || "N/A"}
- ETH Balance: ${ethBalance.toFixed(6)} ETH
- Native Balance: ${balance.toString()} WEI`;
    } catch (error) {
      return `Error getting wallet details: ${error}`;
    }
  }

  /**
   * Checks if the wallet action provider supports the given network.
   * Since wallet actions are network-agnostic, this always returns true.
   *
   * @param _ - The network to check.
   * @returns True, as wallet actions are supported on all networks.
   */
  supportsNetwork = (_: Network): boolean => true;
}

/**
 * Factory function to create a new WalletActionProvider instance.
 *
 * @returns A new WalletActionProvider instance.
 */
export const walletActionProvider = () => new WalletActionProvider();
