import { z } from "zod";

import { ActionProvider } from "../actionProvider";
import { CreateAction } from "../actionDecorator";
import { Network } from "../../network";
import { DexScreenerSchemas } from "./schemas";
import { fetchLatestBoosts, fetchLatestTokenProfiles } from "./services";

/**
 * DexScreenerActionProvider is an action provider for fetching DEX market data.
 * It can be adapted for other providers, e.g., ERC721 or other types of actions.
 */
export class DexScreenerActionProvider extends ActionProvider<any> {
  constructor() {
    super("dexscreener", []); // This can be generalized for ERC721ActionProvider or others
  }

  /**
   * XXX
   *
   * @param _ - The wallet provider (not used for this action).
   * @param args - The input arguments for the action.
   * @returns A message containing pair data.
   */
  @CreateAction({
    name: "get_boosted_tokens_dexscreener",
    description: "This tool allows getting the latest boosted tokens from dexscreener.",
    schema: DexScreenerSchemas.GetLatestBoostedTokens,
  })
  async getBoostedTokens(
    _: any,
    args: z.infer<typeof DexScreenerSchemas.GetLatestBoostedTokens>,
  ): Promise<string> {
    try {
      const data = await fetchLatestBoosts();

      const allTokenAddresses = data.map(
        tokenProfile => `${tokenProfile.tokenAddress} [network: ${tokenProfile.chainId}]`,
      );
      return allTokenAddresses.join(", ");
    } catch (error) {
      return this.handleError(error, "boosted token dexscreener");
    }
  }

  @CreateAction({
    name: "get_latest_token_profiles_dexscreener",
    description: "This tool allows getting the latest token profiles from DexScreener.",
    schema: DexScreenerSchemas.GetLatestTokenProfiles,
  })
  async getLatestTokenProfiles(
    _: any,
    args: z.infer<typeof DexScreenerSchemas.GetLatestTokenProfiles>,
  ): Promise<string> {
    try {
      const data = await fetchLatestTokenProfiles();

      const tokenProfiles = data.map(
        token =>
          `${token.name} (${token.symbol}) - ${token.tokenAddress} [network: ${token.chainId}]`,
      );
      return tokenProfiles.join(", ");
    } catch (error) {
      return this.handleError(error, "latest token profiles from dexscreener");
    }
  }

  /**
   * Handles errors uniformly across actions.
   *
   * @param error - The error to handle.
   * @param action - The action name for better context.
   * @returns A formatted error message.
   */
  private handleError(error: any, action: string): string {
    console.error(`Error fetching ${action}:`, error);
    return `Error fetching ${action}: ${error.message || error}`;
  }

  /**
   * Determines if this action provider supports the given network.
   *
   * @param _ - The network to check support for.
   * @returns true, as this provider can work with any network.
   */
  supportsNetwork = (_: Network) => true;
}

/**
 * Factory function to instantiate the DexScreenerActionProvider.
 */
export const dexScreenerActionProvider = () => new DexScreenerActionProvider();
