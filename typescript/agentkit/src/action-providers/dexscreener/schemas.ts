import { z } from "zod";

/**
 * Input schema for fetching DexScreener pair data.
 */
export const GetPairSchema = z
  .object({
    chainId: z
      .string()
      .describe("The blockchain network identifier (e.g., 'ethereum', 'bsc', etc.)."),
    pairAddress: z
      .string()
      .describe("The contract address of the liquidity pair to fetch data for."),
  })
  .strip()
  .describe("Instructions for retrieving DexScreener pair data.");

/**
 * Input schema for fetching trending pairs.
 */
export const GetTrendingSchema = z
  .object({})
  .strip()
  .describe("Instructions for retrieving trending trading pairs from DexScreener.");

/**
 * Exporting schemas as an object.
 */
export const DexScreenerSchemas = {
  GetPairSchema,
  GetTrendingSchema,
};
