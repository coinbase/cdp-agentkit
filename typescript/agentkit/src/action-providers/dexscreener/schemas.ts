import { z } from "zod";

export const GetLatestBoostedTokens = z.null().describe("This tools does not require input");
export const GetLatestTokenProfiles = z.null().describe("This tool does not require input");

export const GetTokenOrders = z
  .object({
    chainId: z
      .string()
      .describe("The chain ID, for the DEXScreener API. It will be using the network name."),
    tokenAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format") // Validate Ethereum address
      .describe("The token address."),
  })
  .strip() // Remove extra fields
  .describe("Schema for fetching token orders.");

/**
 * Exporting schemas as an object.
 */
export const DexScreenerSchemas = {
  GetLatestBoostedTokens,
  GetLatestTokenProfiles,
  GetTokenOrders,
};
