import { z } from "zod";

/**
 * Input schema for Moonwell MToken deposit action.
 */
export const DepositSchema = z
    .object({
        assets: z
            .string()
            .regex(/^\d+(\.\d+)?$/, "Must be a valid integer or decimal value")
            .describe("The quantity of assets to deposit, in whole units"),
        tokenAddress: z
            .string()
            .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
            .describe("The address of the assets token to approve for deposit"),
        mTokenAddress: z
            .string()
            .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
            .describe("The address of the Moonwell MToken to deposit to"),
    })
    .describe("Input schema for Moonwell MToken deposit action");

/**
 * Input schema for Moonwell MToken withdraw action.
 */
export const WithdrawSchema = z
    .object({
        mTokenAddress: z
            .string()
            .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
            .describe("The address of the Moonwell MToken to withdraw from"),
        assets: z
            .string()
            .regex(/^\d+$/, "Must be a valid whole number")
            .describe("The amount of assets to withdraw in atomic units e.g. 1"),
    })
    .strip()
    .describe("Input schema for Moonwell MToken withdraw action"); 