import { z } from "zod";

/**
 * Schema for the get_wallet_details action.
 * This action doesn't require any input parameters, so we use an empty object schema.
 */
export const GetWalletDetailsSchema = z.object({});

/**
 * Input schema for transfer action.
 */
export const TransferSchema = z
  .object({
    amount: z.bigint().describe("The amount to transfer in WEI"),
    destination: z.string().describe("The destination address to receive the funds"),
  })
  .strip()
  .describe("Instructions for transferring native tokens");
