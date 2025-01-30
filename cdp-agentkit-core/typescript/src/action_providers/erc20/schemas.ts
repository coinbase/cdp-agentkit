import { z } from "zod";

/**
 * Input schema for transfer action.
 */
export const TransferSchema = z
  .object({
    amount: z.custom<bigint>().describe("The amount of the asset to transfer"),
    contractAddress: z.string().describe("The contract address of the token to transfer"),
    destination: z.string().describe("The destination to transfer the funds"),
  })
  .strip()
  .describe("Instructions for transferring assets");
