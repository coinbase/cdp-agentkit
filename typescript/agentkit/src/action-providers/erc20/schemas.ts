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

/**
 * Input schema for get balance action.
 */
export const GetBalanceSchema = z
  .object({
    contractAddress: z
      .string()
      .describe("The contract address of the token to get the balance for"),
  })
  .strip()
  .describe("Instructions for getting wallet balance");
export const ApproveSchema = z
  .object({
    amount: z.custom<bigint>().describe("The amount to approve"),
    contractAddress: z.string().describe("The contract address of the token"),
    spender: z.string().describe("The address to approve spending for"),
  })
  .strip()
  .describe("Instructions for approving token spending");
export const AllowanceSchema = z
  .object({
    contractAddress: z.string().describe("The contract address of the token"),
    spender: z.string().describe("The address to check allowance for"),
  })
  .strip()
  .describe("Instructions for checking token allowance");
