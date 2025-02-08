import { z } from "zod";
import { ActionProvider } from "../actionProvider";
import { CreateAction } from "../actionDecorator";
import { Network } from "../../network";
import { DexScreenerSchemas } from "./schemas";
import { DEXSCREENER_API } from "./constants"; // Import constants
import { fetchTokenProfiles } from "./constants"; // Import the function for token profiles

/**
 * DexScreenerActionProvider is an action provider for fetching DEX market data.
 * It can be adapted for other providers, e.g., ERC721 or other types of actions.
 */
export class DexScreenerActionProvider extends ActionProvider<any> {
  constructor() {
    super("dexscreener", []); // This can be generalized for ERC721ActionProvider or others
  }

  /**
   * Fetches data for a given token pair.
   *
   * @param _ - The wallet provider (not used for this action).
   * @param args - The input arguments for the action.
   * @returns A message containing pair data.
   */
  @CreateAction({
    name: "get_pair_data",
    description: "Fetches market data for a given token pair.",
    schema: DexScreenerSchemas.GetPairSchema,
  })
  async getPairData(
    _: any,
    args: z.infer<typeof DexScreenerSchemas.GetPairSchema>,
  ): Promise<string> {
    try {
      const response = await fetch(`${DEXSCREENER_API}/pairs/${args.chainId}/${args.pairAddress}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return this.handleError(error, "pair data");
    }
  }

  /**
   * Fetches trending pairs on DEXs.
   *
   * @param _ - The wallet provider (not used for this action).
   * @param args - The input arguments for the action.
   * @returns A message containing trending pairs data.
   */
  @CreateAction({
    name: "get_trending_pairs",
    description: "Fetches the trending token pairs from DexScreener.",
    schema: DexScreenerSchemas.GetTrendingSchema,
  })
  async getTrendingPairs(
    _: any,
    args: z.infer<typeof DexScreenerSchemas.GetTrendingSchema>,
  ): Promise<string> {
    try {
      const response = await fetch(`${DEXSCREENER_API}/trending`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return this.handleError(error, "trending pairs");
    }
  }

  /**
   * Fetches the latest token profiles.
   *
   * @returns The token profile data or an error message.
   */
  @CreateAction({
    name: "get_token_profiles",
    description: "Fetches the latest token profiles from DexScreener.",
    schema: DexScreenerSchemas.GetTrendingSchema, // You can change this schema as per your requirement
  })
  async getTokenProfiles(): Promise<string> {
    try {
      const data = await fetchTokenProfiles(); // Use the existing fetch function
      if (!data) {
        throw new Error("Failed to fetch token profiles.");
      }
      return JSON.stringify(data, null, 2);
    } catch (error) {
      return this.handleError(error, "token profiles");
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
