import { z } from "zod";

/**
 * Schema for transferring SPL tokens to another address.
 */
export const TransferTokenSchema = z
  .object({
    recipient: z.string().describe("The recipient's Solana address"),
    mintAddress: z.string().describe("The SPL token's mint address"),
    amount: z.number().positive().describe("Amount of tokens to transfer"),
    createAtaIfMissing: z
      .boolean()
      .optional()
      .default(true)
      .describe("Whether to create an Associated Token Account if it doesn't exist"),
  })
  .describe("Transfer SPL tokens to another Solana address");
