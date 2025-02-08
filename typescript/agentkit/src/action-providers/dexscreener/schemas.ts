import { z } from "zod";

export const GetLatestBoostedTokens = z.null().describe("This tools does not require input");
export const GetLatestTokenProfiles = z.null().describe("This tool does not require input");

/**
 * Exporting schemas as an object.
 */
export const DexScreenerSchemas = {
  GetLatestBoostedTokens,
  GetLatestTokenProfiles,
};
