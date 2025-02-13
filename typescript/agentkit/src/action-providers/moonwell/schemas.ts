import { isAddress } from "viem";
import { z } from "zod";

/**
 * Input schema for Moonwell MToken mint action.
 */
export const MintSchema = z
  .object({
    assets: z
      .string()
      .regex(/^\d+(\.\d+)?$/, "Must be a valid integer or decimal value")
      .describe("The quantity of assets to use to mint, in whole units"),
    tokenAddress: z
      .string()
      .refine(val => isAddress(val, { strict: false }), "Invalid Ethereum address format")
      .describe("The address of the assets token to approve for minting"),
    mTokenAddress: z
      .string()
      .refine(val => isAddress(val, { strict: false }), "Invalid Ethereum address format")
      .describe("The address of the Moonwell MToken to mint from"),
  })
  .describe("Input schema for Moonwell MToken mint action");

/**
 * Input schema for Moonwell MToken redeem action.
 */
export const RedeemSchema = z
  .object({
    mTokenAddress: z
      .string()
      .refine(val => isAddress(val, { strict: false }), "Invalid Ethereum address format")
      .describe("The address of the Moonwell MToken to redeem from"),
    assets: z
      .string()
      .regex(/^\d+(\.\d+)?$/, "Must be a valid integer or decimal value")
      .describe("The quantity of assets to redeem, in whole units"),
  })
  .strip()
  .describe("Input schema for Moonwell MToken redeem action");
