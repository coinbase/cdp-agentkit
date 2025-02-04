import { z, ZodIssueCode } from "zod";

/**
 * Input schema for bidding on an NFT (ERC721) on Magic Eden.
 * Ensures that at least one of `token` or `collection` is provided,
 * and that `weiPrice` is a nonempty string.
 */
export const BidSchema = z
  .object({
    weiPrice: z.string().min(1, "Bid amount in wei is required").describe("Bid amount in wei"),
    expirationTime: z
      .string()
      .min(1, "Expiration time is required")
      .describe("Bid expiration time (epoch)"),
    apiKey: z.string().min(1, "API key is required").describe("Magic Eden API key"),
    token: z.string().optional().describe("The NFT ID in the format 'collectionAddress:tokenId'"),
    collection: z.string().optional().describe("The collection address"),
  })
  .strip()
  .describe("Input schema for NFT bid action");
