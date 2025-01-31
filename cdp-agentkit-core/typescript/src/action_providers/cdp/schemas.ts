import { z } from "zod";

/**
 * Input schema for address reputation check.
 */
export const AddressReputationSchema = z
  .object({
    address: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
      .describe("The Ethereum address to check"),
    network: z.string().describe("The network to check the address on"),
  })
  .strip()
  .describe("Input schema for address reputation check");

/**
 * Input schema for request faucet funds action.
 */
export const RequestFaucetFundsSchema = z
  .object({
    assetId: z.string().optional().describe("The optional asset ID to request from faucet"),
  })
  .strip()
  .describe("Instructions for requesting faucet funds");

/**
 * Input schema for deploy token action.
 */
export const DeployTokenSchema = z
  .object({
    name: z.string().describe("The name of the token"),
    symbol: z.string().describe("The token symbol"),
    totalSupply: z.custom<bigint>().describe("The total supply of tokens to mint"),
  })
  .strip()
  .describe("Instructions for deploying a token");
